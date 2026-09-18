import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

export type StudioTexture = 'marble' | 'cement' | 'line-brush';

@Component({
  selector: 'app-light-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './light-studio.component.html',
  styleUrl: './light-studio.component.css'
})
export class LightStudioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lightCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone = inject(NgZone);
  private readonly audioService = inject(AudioService);

  readonly activeTexture = signal<StudioTexture>('marble');
  readonly lightTemp = signal<number>(3200); // Kelvin
  readonly lightIntensity = signal<number>(85);

  private ctx!: CanvasRenderingContext2D;
  private animId: number | null = null;
  private lightX = 0;
  private lightY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit(): void {
    this.initCanvas();
    this.startLoop();
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  selectTexture(tex: StudioTexture): void {
    this.activeTexture.set(tex);
    this.audioService.playChime(tex === 'marble' ? 1.4 : tex === 'cement' ? 0.9 : 1.2);
  }

  setLightTemp(event: Event): void {
    this.lightTemp.set(Number((event.target as HTMLInputElement).value));
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { willReadFrequently: false })!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.lightX = canvas.width * 0.35;
    this.lightY = canvas.height * 0.4;
    this.targetX = this.lightX;
    this.targetY = this.lightY;
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }

  onMouseMove(e: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.targetX = (e.clientX - rect.left) * dpr;
    this.targetY = (e.clientY - rect.top) * dpr;
  }

  private startLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      let t = 0;
      const render = () => {
        t += 0.01;
        this.lightX += (this.targetX - this.lightX) * 0.08;
        this.lightY += (this.targetY - this.lightY) * 0.08;
        this.drawScene(t);
        this.animId = requestAnimationFrame(render);
      };
      this.animId = requestAnimationFrame(render);
    });
  }

  private drawScene(t: number): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const tex = this.activeTexture();

    // 1. Base Substrate Tone
    if (tex === 'marble') {
      ctx.fillStyle = '#0F1115';
    } else if (tex === 'cement') {
      ctx.fillStyle = '#181A1D';
    } else {
      ctx.fillStyle = '#1D1C19';
    }
    ctx.fillRect(0, 0, w, h);

    // 2. Grazing Directional Spotlight
    const kelvin = this.lightTemp();
    // Approximate RGB from Kelvin (2700K warm gold -> 5000K cool white)
    const warmRatio = (5000 - kelvin) / 2300;
    const lightR = 255;
    const lightG = Math.floor(220 - warmRatio * 35);
    const lightB = Math.floor(180 - warmRatio * 75);

    const radius = Math.max(w, h) * 0.7;
    const spotGrad = ctx.createRadialGradient(this.lightX, this.lightY, 20, this.lightX, this.lightY, radius);
    spotGrad.addColorStop(0, `rgba(${lightR}, ${lightG}, ${lightB}, 0.28)`);
    spotGrad.addColorStop(0.35, `rgba(${lightR}, ${lightG}, ${lightB}, 0.08)`);
    spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, w, h);

    // 3. Render 3D Texture Surface Elements with Light Vector Highlights
    ctx.save();
    if (tex === 'marble') {
      // Swirling veining with dynamic glint towards light
      const numVeins = 6;
      for (let i = 0; i < numVeins; i++) {
        ctx.beginPath();
        const startY = (i / numVeins) * h;
        ctx.moveTo(0, startY);
        for (let x = 0; x <= w; x += 25) {
          const wave = Math.sin(x * 0.002 + i) * 60 + Math.cos(x * 0.005) * 20;
          ctx.lineTo(x, startY + wave);
        }
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(235, 200, 130, 0.25)' : 'rgba(240, 240, 245, 0.2)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Specular glint flecks
      for (let gx = 40; gx < w; gx += 80) {
        for (let gy = 40; gy < h; gy += 80) {
          const dist = Math.hypot(gx - this.lightX, gy - this.lightY);
          const glint = Math.max(0, 1 - dist / (w * 0.4));
          if (glint > 0.1) {
            ctx.beginPath();
            ctx.arc(gx, gy, 1.5 + glint * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 215, 140, ${glint * 0.8})`;
            ctx.fill();
          }
        }
      }

    } else if (tex === 'cement') {
      // Concrete air-pocket voids casting shadows opposite to light source
      const dx = this.lightX - w / 2;
      const dy = this.lightY - h / 2;
      const shadowAngle = Math.atan2(dy, dx) + Math.PI;

      for (let cx = 60; cx < w; cx += 100) {
        for (let cy = 60; cy < h; cy += 100) {
          const r = 5 + (Math.sin(cx + cy) * 3);
          // Dark void
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(10, 12, 14, 0.7)';
          ctx.fill();

          // Raked shadow rim
          ctx.beginPath();
          ctx.arc(cx + Math.cos(shadowAngle) * 2, cy + Math.sin(shadowAngle) * 2, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Illuminated rim
          ctx.beginPath();
          ctx.arc(cx - Math.cos(shadowAngle) * 1.5, cy - Math.sin(shadowAngle) * 1.5, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

    } else if (tex === 'line-brush') {
      // Parallel vertical corduroy grooves
      const numGrooves = Math.floor(w / 18);
      for (let g = 0; g < numGrooves; g++) {
        const gx = g * 18;
        const distToLight = Math.abs(gx - this.lightX);
        const intensity = Math.max(0.08, 1 - distToLight / (w * 0.5));

        // Dark groove trench
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.strokeStyle = 'rgba(12, 10, 8, 0.65)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Raked specular crest catching side grazing light
        ctx.beginPath();
        ctx.moveTo(gx + 3, 0);
        ctx.lineTo(gx + 3, h);
        ctx.strokeStyle = `rgba(${lightR}, ${lightG}, ${lightB}, ${intensity * 0.45})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    }
    ctx.restore();
  }
}
