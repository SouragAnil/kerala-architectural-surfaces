import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

export type LabTechnique = 'marble' | 'cement' | 'line-brush';

interface SwirlPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isGold: boolean;
}

interface ConcretePit {
  x: number;
  y: number;
  radius: number;
  depth: number;
}

interface BrushLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  alpha: number;
}

@Component({
  selector: 'app-marble-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marble-lab.component.html',
  styleUrl: './marble-lab.component.css'
})
export class MarbleLabComponent implements AfterViewInit, OnDestroy {
  @ViewChild('labCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone = inject(NgZone);
  private readonly audioService = inject(AudioService);

  readonly activeTechnique = signal<LabTechnique>('marble');

  readonly baseColors = [
    { name: 'Nero Basalt', hex: '#111317', vein: '#E2C082' },
    { name: 'Carrara Alabaster', hex: '#EBE9E2', vein: '#7F878F' },
    { name: 'Industrial Grey Cement', hex: '#8F9194', vein: '#5E6063' },
    { name: 'Malachite Emerald', hex: '#0B231B', vein: '#53C298' },
    { name: 'Warm Raked Corduroy', hex: '#D2C8BA', vein: '#A69B89' }
  ];

  readonly activeColor = signal(this.baseColors[0]);
  readonly textureDensity = signal<number>(70);
  readonly reliefDepth = signal<number>(65);

  private ctx!: CanvasRenderingContext2D;
  private animId: number | null = null;
  private isPointerDown = false;
  private points: SwirlPoint[] = [];
  private cementPits: ConcretePit[] = [];
  private combedLines: BrushLine[] = [];
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit(): void {
    this.initCanvas();
    this.seedField();
    this.startSimulation();
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  setTechnique(tech: LabTechnique): void {
    this.activeTechnique.set(tech);
    this.audioService.playChime(tech === 'marble' ? 1.4 : tech === 'cement' ? 0.9 : 1.2);

    if (tech === 'cement') {
      this.activeColor.set(this.baseColors[2]);
    } else if (tech === 'line-brush') {
      this.activeColor.set(this.baseColors[4]);
    } else {
      this.activeColor.set(this.baseColors[0]);
    }

    this.seedField();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { willReadFrequently: false })!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    this.drawCurrentState();
  }

  selectBaseColor(color: typeof this.baseColors[0]): void {
    this.activeColor.set(color);
    this.audioService.playChime(1.2);
    this.seedField();
  }

  setTextureDensity(val: Event): void {
    this.textureDensity.set(Number((val.target as HTMLInputElement).value));
    this.seedField();
  }

  setReliefDepth(val: Event): void {
    this.reliefDepth.set(Number((val.target as HTMLInputElement).value));
  }

  seedField(): void {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const tech = this.activeTechnique();

    if (tech === 'marble') {
      this.points = [];
      const count = Math.floor((this.textureDensity() / 100) * 110) + 40;
      const currentBase = this.activeColor();
      for (let i = 0; i < count; i++) {
        this.points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 35 + 15,
          color: Math.random() > 0.35 ? currentBase.vein : '#FFFFFF',
          isGold: Math.random() < 0.65
        });
      }
    } else if (tech === 'cement') {
      this.cementPits = [];
      const pitCount = Math.floor((this.textureDensity() / 100) * 180) + 50;
      for (let i = 0; i < pitCount; i++) {
        this.cementPits.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 8 + 2,
          depth: Math.random() * 0.4 + 0.2
        });
      }
    } else if (tech === 'line-brush') {
      this.combedLines = [];
      const numLines = Math.floor((this.textureDensity() / 100) * 70) + 30;
      const spacing = w / numLines;
      for (let i = 0; i < numLines; i++) {
        const x = i * spacing + (Math.random() - 0.5) * 4;
        this.combedLines.push({
          x1: x,
          y1: 0,
          x2: x + (Math.random() - 0.5) * 10,
          y2: h,
          width: Math.random() * 3 + 1.5,
          alpha: Math.random() * 0.4 + 0.35
        });
      }
    }
  }

  onPointerDown(e: PointerEvent): void {
    this.isPointerDown = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.lastX = (e.clientX - rect.left) * dpr;
    this.lastY = (e.clientY - rect.top) * dpr;
    this.audioService.playTrowelSlide();
    this.handleInteraction(this.lastX, this.lastY, 0, 0);
  }

  onPointerMove(e: PointerEvent): void {
    if (!this.isPointerDown) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const curX = (e.clientX - rect.left) * dpr;
    const curY = (e.clientY - rect.top) * dpr;

    const dx = curX - this.lastX;
    const dy = curY - this.lastY;

    this.handleInteraction(curX, curY, dx, dy);

    this.lastX = curX;
    this.lastY = curY;
  }

  onPointerUp(): void {
    this.isPointerDown = false;
  }

  private handleInteraction(x: number, y: number, dx: number, dy: number): void {
    const tech = this.activeTechnique();

    if (tech === 'marble') {
      const forceRadius = 140;
      for (const p of this.points) {
        const dist = Math.hypot(p.x - x, p.y - y);
        if (dist < forceRadius) {
          const factor = (1 - dist / forceRadius) * 4;
          p.vx += (dx * 0.2 + (Math.random() - 0.5) * 2) * factor;
          p.vy += (dy * 0.2 + (Math.random() - 0.5) * 2) * factor;
        }
      }
    } else if (tech === 'cement') {
      // Add new concrete air pockets and trowel marks where dragged
      for (let i = 0; i < 3; i++) {
        this.cementPits.push({
          x: x + (Math.random() - 0.5) * 40,
          y: y + (Math.random() - 0.5) * 40,
          radius: Math.random() * 10 + 3,
          depth: Math.random() * 0.5 + 0.3
        });
      }
      if (this.cementPits.length > 400) this.cementPits.shift();
    } else if (tech === 'line-brush') {
      // Add new combed raked lines aligned with mouse drag
      const teeth = 8;
      for (let i = 0; i < teeth; i++) {
        const offset = (i - teeth / 2) * 6;
        this.combedLines.push({
          x1: x + offset - dx * 2,
          y1: y - dy * 2,
          x2: x + offset,
          y2: y,
          width: 2.2,
          alpha: 0.6
        });
      }
      if (this.combedLines.length > 250) this.combedLines.splice(0, teeth);
    }
  }

  private startSimulation(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.updateAndDraw();
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    });
  }

  private updateAndDraw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const tech = this.activeTechnique();

    // 1. Draw Substrate Background
    ctx.fillStyle = this.activeColor().hex;
    ctx.fillRect(0, 0, w, h);

    if (tech === 'marble') {
      // Liquid marble turbulence
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of this.points) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.isGold) {
          grad.addColorStop(0, 'rgba(235, 195, 105, 0.45)');
          grad.addColorStop(0.5, 'rgba(195, 150, 60, 0.2)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(0, 'rgba(240, 240, 245, 0.3)');
          grad.addColorStop(0.7, 'rgba(180, 185, 195, 0.1)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

    } else if (tech === 'cement') {
      // Raw Cement air-pocket pitting & trowel clouding
      ctx.save();
      // Render subtle cloudy tonal variations
      const cloudGrad = ctx.createLinearGradient(0, 0, w, h);
      cloudGrad.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      cloudGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
      ctx.fillStyle = cloudGrad;
      ctx.fillRect(0, 0, w, h);

      // Render air pocket voids
      for (const pit of this.cementPits) {
        ctx.beginPath();
        ctx.arc(pit.x, pit.y, pit.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 32, 36, ${pit.depth})`;
        ctx.fill();

        // Highlight rim from top grazing light
        ctx.beginPath();
        ctx.arc(pit.x, pit.y + 1, pit.radius, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pit.depth * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

    } else if (tech === 'line-brush') {
      // Linear Raked Plaster corduroy striations
      ctx.save();
      for (const line of this.combedLines) {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(25, 22, 18, ${line.alpha})`;
        ctx.lineWidth = line.width;
        ctx.stroke();

        // Raking side light rim on each combed groove
        ctx.beginPath();
        ctx.moveTo(line.x1 + 1.5, line.y1);
        ctx.lineTo(line.x2 + 1.5, line.y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  private drawCurrentState(): void {
    this.updateAndDraw();
  }

  agitateField(): void {
    this.audioService.playTrowelSlide();
    this.seedField();
  }

  downloadSwatch(): void {
    this.audioService.playChime(1.5);
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.download = `marmoris-${this.activeTechnique()}-texture-swatch.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
