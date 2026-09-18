import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AudioService } from '../../services/audio.service';
import { SampleCartService } from '../../services/sample-cart.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-canvas.component.html',
  styleUrl: './hero-canvas.component.css'
})
export class HeroCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroStage', { static: true }) heroStage!: ElementRef<HTMLElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('card1', { static: true }) card1!: ElementRef<HTMLElement>;
  @ViewChild('card2', { static: true }) card2!: ElementRef<HTMLElement>;
  @ViewChild('card3', { static: true }) card3!: ElementRef<HTMLElement>;

  private readonly ngZone = inject(NgZone);
  private readonly audioService = inject(AudioService);
  readonly cartService = inject(SampleCartService);

  private ctx!: CanvasRenderingContext2D;
  private animFrameId: number | null = null;
  private scrollProgress = 0;
  private currentProgress = 0;
  private scrollTriggerInstance: ScrollTrigger | null = null;

  // Mineral vein particle nodes
  private particles: { x: number; y: number; size: number; alpha: number; gold: boolean }[] = [];

  ngAfterViewInit(): void {
    this.initCanvas();
    this.initGSAPScroll();
    this.startRenderLoop();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Generate gold and mica mineral flakes
    this.particles = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        gold: Math.random() > 0.4
      });
    }
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  }

  private initGSAPScroll(): void {
    this.ngZone.runOutsideAngular(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: this.heroStage.nativeElement,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          this.scrollProgress = self.progress;
        }
      });
      this.scrollTriggerInstance = pinTrigger;

      // GSAP Timeline to transition editorial statements in lockstep with the video-like canvas scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.heroStage.nativeElement,
          start: 'top top',
          end: '+=300%',
          scrub: 1
        }
      });

      // Card 1 dissolves as veins agitate
      tl.to(this.card1.nativeElement, { opacity: 0, y: -40, duration: 0.3, ease: 'power2.inOut' }, 0.25)
        // Card 2 enters and reveals macro vein insight
        .fromTo(this.card2.nativeElement, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.32)
        .to(this.card2.nativeElement, { opacity: 0, y: -40, duration: 0.25, ease: 'power2.in' }, 0.62)
        // Card 3 enters showing architectural fruition
        .fromTo(this.card3.nativeElement, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.68);
    });
  }

  private startRenderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      let time = 0;
      const render = () => {
        time += 0.008;
        // Smooth interpolation for inertia-rich video scrub feel
        this.currentProgress += (this.scrollProgress - this.currentProgress) * 0.12;
        this.drawMarbleFrame(this.currentProgress, time);
        this.animFrameId = requestAnimationFrame(render);
      };
      this.animFrameId = requestAnimationFrame(render);
    });
  }

  /**
   * Renders the multi-pass procedural marble paint canvas frame
   * Bound in real-time to scroll progress (video scrub illusion)
   */
  private drawMarbleFrame(progress: number, time: number): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Base background tone morphs from unctuous dark graphite to deep Nero Marquina & Carrara contrast
    const baseGradient = ctx.createLinearGradient(0, 0, w * 0.8, h);
    const darkRatio = Math.sin(progress * Math.PI * 0.5);
    const r = Math.floor(10 + darkRatio * 4);
    const g = Math.floor(12 + darkRatio * 3);
    const b = Math.floor(15 + darkRatio * 2);

    baseGradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
    baseGradient.addColorStop(0.6, `rgb(${r + 8}, ${g + 7}, ${b + 6})`);
    baseGradient.addColorStop(1, `rgb(${Math.max(4, r - 4)}, ${Math.max(5, g - 4)}, ${Math.max(6, b - 4)})`);
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, w, h);

    // Dynamic light beam moving across wall based on scroll progress
    const lightX = w * (0.2 + progress * 0.65);
    const lightY = h * (0.3 + Math.sin(progress * Math.PI) * 0.2);
    const lightRadius = Math.max(w, h) * 0.75;
    const lightGlow = ctx.createRadialGradient(lightX, lightY, 30, lightX, lightY, lightRadius);
    lightGlow.addColorStop(0, 'rgba(235, 205, 145, 0.18)');
    lightGlow.addColorStop(0.35, 'rgba(201, 168, 106, 0.08)');
    lightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lightGlow;
    ctx.fillRect(0, 0, w, h);

    // Multi-octave vein ribbon curves (Simulating viscous liquid marble swirls)
    ctx.save();
    const numVeins = 7;
    const swirlFactor = 1.0 + progress * 2.8;

    for (let i = 0; i < numVeins; i++) {
      ctx.beginPath();
      const veinOffset = (i / numVeins) * h;
      const amplitude = (50 + i * 25) * swirlFactor;
      const frequency = 0.0018 - i * 0.00015;

      const startY = veinOffset - (progress * h * 0.4);
      ctx.moveTo(0, startY);

      for (let x = 0; x <= w; x += 16) {
        // Domain-warped turbulence
        const wave1 = Math.sin(x * frequency + time + i + progress * 5) * amplitude;
        const wave2 = Math.cos(x * frequency * 2.2 - time * 0.7 + i * 0.5) * (amplitude * 0.35);
        const wave3 = Math.sin((x + startY) * 0.003 + progress * 8) * (amplitude * 0.2);
        const y = startY + wave1 + wave2 + wave3;
        ctx.lineTo(x, y);
      }

      // Vein stroke styles: alternated Carrara ivory calcite and 24K liquid gold
      const isGold = i % 2 === 1;
      const veinAlpha = (0.22 + Math.sin(progress * 3 + i) * 0.08) * (1 - progress * 0.15);

      if (isGold) {
        ctx.strokeStyle = `rgba(224, 186, 108, ${veinAlpha * 1.3})`;
        ctx.lineWidth = 2.2 * (swirlFactor * 0.7);
        ctx.shadowColor = 'rgba(237, 209, 153, 0.4)';
        ctx.shadowBlur = 12;
      } else {
        ctx.strokeStyle = `rgba(240, 238, 232, ${veinAlpha * 0.85})`;
        ctx.lineWidth = 4.5 * (swirlFactor * 0.6);
        ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
    }
    ctx.restore();

    // Floating gold leaf mica particles that shimmer in the light
    ctx.save();
    for (const p of this.particles) {
      const px = p.x * w + Math.sin(time + p.y * 10 + progress * 6) * 20;
      const py = (p.y * h - (progress * h * 0.5) + h * 2) % h;

      // Distance to light source for specular glint
      const distToLight = Math.hypot(px - lightX, py - lightY);
      const glint = Math.max(0, 1 - distToLight / (w * 0.5)) * 1.5;

      ctx.beginPath();
      ctx.arc(px, py, p.size * (1 + glint * 0.5), 0, Math.PI * 2);

      if (p.gold) {
        ctx.fillStyle = `rgba(235, 195, 110, ${Math.min(1, (p.alpha + glint) * 0.85)})`;
      } else {
        ctx.fillStyle = `rgba(245, 245, 248, ${Math.min(1, (p.alpha + glint * 0.5) * 0.7)})`;
      }
      ctx.fill();
    }
    ctx.restore();

    // Subtle grain texture overlay for organic plaster micro-cement tactile feel
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
    for (let gx = 0; gx < w; gx += 40) {
      if (Math.sin(gx + time) > 0.3) {
        ctx.fillRect(gx, 0, 1.5, h);
      }
    }
    ctx.restore();
  }

  scrollToCollection(): void {
    this.audioService.playTrowelSlide();
    document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  openLab(): void {
    this.audioService.playChime(1.1);
    document.getElementById('lab-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
