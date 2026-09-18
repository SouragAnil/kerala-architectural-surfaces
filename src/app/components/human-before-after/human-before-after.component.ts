import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CaseComparison {
  id: string;
  title: string;
  location: string;
  finishType: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  timeTaken: string;
}

@Component({
  selector: 'app-human-before-after',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="before-after" class="comparison-section">
      <div class="site-container-fluid">
        <!-- Section Header -->
        <div class="section-intro">
          <span class="human-pill">1:1 Matched Space Transformation</span>
          <h2 class="section-title font-serif">Before & After Handcrafting</h2>
          <p class="section-subtitle">
            See the exact same room before and after our artisans apply the finish. Drag the central handle to reveal the transformation from raw unpainted substrate to finished artisanal texture.
          </p>

          <!-- Case Tabs -->
          <div class="case-tabs">
            <button 
              *ngFor="let item of cases"
              (click)="activeCase.set(item)"
              [class.active]="activeCase().id === item.id"
              class="tab-btn"
            >
              {{ item.title }}
            </button>
          </div>
        </div>

        <!-- Full-Width Expansive Cinematic Slider Container -->
        <div class="slider-wrapper">
          <div 
            class="comparison-container" 
            (mousemove)="onMouseMove($event)" 
            (touchmove)="onTouchMove($event)"
          >
            <!-- After Image (Underneath, full 100% matching dimension) -->
            <img 
              [src]="activeCase().afterImage" 
              [alt]="activeCase().afterLabel" 
              class="comp-img after-img"
            />
            <span class="img-badge after-badge">{{ activeCase().afterLabel }}</span>

            <!-- Before Image (Overlayed, clipped with 100% pixel-perfect matching alignment) -->
            <img 
              [src]="activeCase().beforeImage" 
              [alt]="activeCase().beforeLabel" 
              class="comp-img before-img"
              [style.clip-path]="'inset(0 ' + (100 - sliderPosition()) + '% 0 0)'"
            />
            <span class="img-badge before-badge">{{ activeCase().beforeLabel }}</span>

            <!-- Drag Handle Divider Line -->
            <div class="drag-handle" [style.left.%]="sliderPosition()">
              <div class="handle-line"></div>
              <div class="handle-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M6 8L2 12L6 16"></path>
                </svg>
              </div>
            </div>

            <!-- Range input overlay for accessible dragging and touch -->
            <input 
              type="range" 
              min="0" 
              max="100" 
              [value]="sliderPosition()" 
              (input)="onRangeChange($event)"
              class="range-slider-input" 
              aria-label="Before and after comparison slider"
            />
          </div>

          <!-- Project Transformation Details Card -->
          <div class="details-box">
            <div class="detail-header">
              <div class="detail-title-group">
                <span class="loc-text">{{ activeCase().location }}</span>
                <h4 class="finish-title font-serif">{{ activeCase().finishType }}</h4>
              </div>
              <div class="time-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Execution: {{ activeCase().timeTaken }}</span>
              </div>
            </div>

            <p class="case-desc">
              {{ activeCase().description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .comparison-section {
      padding: clamp(3.5rem, 7vw, 6.5rem) 0;
      background-color: var(--bg-secondary);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      width: 100%;
    }
    .section-intro {
      text-align: center;
      max-width: 800px;
      margin: 0 auto clamp(2rem, 4vw, 3.5rem) auto;
    }
    .section-title {
      font-size: clamp(1.85rem, 3.5vw, 2.75rem);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0.85rem 0 0.6rem 0;
      letter-spacing: -0.01em;
    }
    .section-subtitle {
      font-size: clamp(0.9rem, 1.2vw, 1.05rem);
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }

    .case-tabs {
      display: inline-flex;
      background-color: var(--bg-card);
      padding: 0.35rem;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      gap: 0.35rem;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 100%;
    }
    .tab-btn {
      padding: 0.55rem clamp(0.75rem, 1.5vw, 1.25rem);
      font-size: clamp(0.76rem, 1.1vw, 0.84rem);
      font-weight: 600;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: var(--transition-smooth);
      white-space: nowrap;
    }
    .tab-btn:hover {
      color: var(--text-primary);
    }
    .tab-btn.active {
      background-color: var(--text-primary);
      color: #FFFFFF;
    }

    .slider-wrapper {
      width: 100%;
      margin: 0 auto;
    }

    .comparison-container {
      position: relative;
      width: 100%;
      height: clamp(340px, 60vh, 700px);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-hover);
      user-select: none;
      background-color: #1A1917;
    }

    .comp-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      pointer-events: none;
    }

    .before-img {
      z-index: 2;
    }

    .img-badge {
      position: absolute;
      top: clamp(0.75rem, 2vw, 1.25rem);
      padding: 0.4rem clamp(0.65rem, 1.2vw, 0.95rem);
      font-size: clamp(0.68rem, 1vw, 0.76rem);
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: 4px;
      z-index: 6;
      white-space: nowrap;
    }
    .before-badge {
      left: clamp(0.75rem, 2vw, 1.25rem);
      background-color: rgba(26, 25, 23, 0.88);
      color: #FFFFFF;
    }
    .after-badge {
      right: clamp(0.75rem, 2vw, 1.25rem);
      background-color: var(--accent-brass);
      color: #FFFFFF;
    }

    .drag-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #FFFFFF;
      z-index: 10;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .handle-line {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 12px rgba(0,0,0,0.6);
    }
    .handle-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: clamp(36px, 5vw, 44px);
      height: clamp(36px, 5vw, 44px);
      background-color: #FFFFFF;
      color: var(--text-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(0,0,0,0.35);
    }

    .range-slider-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: ew-resize;
      z-index: 20;
      touch-action: pan-y;
    }

    .details-box {
      margin-top: 1.5rem;
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: clamp(1.2rem, 2.5vw, 2rem);
      box-shadow: var(--shadow-subtle);
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    .detail-title-group {
      flex: 1;
      min-width: 250px;
    }
    .loc-text {
      font-size: clamp(0.72rem, 1vw, 0.78rem);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-brass-dark);
      display: block;
    }
    .finish-title {
      font-size: clamp(1.15rem, 2vw, 1.45rem);
      font-weight: 600;
      color: var(--text-primary);
      margin-top: 3px;
    }
    .time-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background-color: var(--bg-secondary);
      padding: 0.35rem 0.75rem;
      border-radius: 4px;
      font-size: clamp(0.72rem, 1vw, 0.8rem);
      color: var(--text-secondary);
      font-weight: 600;
      white-space: nowrap;
    }
    .case-desc {
      font-size: clamp(0.85rem, 1.1vw, 0.95rem);
      color: var(--text-secondary);
      line-height: 1.6;
    }
  `]
})
export class HumanBeforeAfterComponent {
  readonly cases: CaseComparison[] = [
    {
      id: 'case-marble',
      title: 'Marine Drive Penthouse: Marble Stucco',
      location: 'Marine Drive, Kochi • Living Room Feature Wall',
      finishType: 'Bare Substrate to Italian Carrara Marble Stucco',
      beforeLabel: 'Before: Bare Primed Substrate',
      afterLabel: 'After: Hand-Burnished Carrara Stucco',
      beforeImage: '/assets/kochi_penthouse_marble_before.jpg',
      afterImage: '/assets/kochi_penthouse_marble.jpg',
      description: 'Drag the slider across this Marine Drive penthouse living room: see the plain, untextured primed basecoat wall transform into 3 coats of micronized Italian Carrara marble stucco with natural veining, diamond hand-burnishing, and brass inlay details — with the entire room and twilight ocean panorama seamlessly preserved.',
      timeTaken: '4 Days (180 sq.ft wall)'
    },
    {
      id: 'case-linebrush',
      title: 'Calicut Courtyard: Line Brush Corduroy',
      location: 'Mavoor Road, Kozhikode • Double Height Courtyard Wall',
      finishType: 'Flat Basecoat to Artisanal Line Brush Corduroy',
      beforeLabel: 'Before: Flat Basecoat Plaster',
      afterLabel: 'After: Artisanal Corduroy Line Brush',
      beforeImage: '/assets/calicut_linebrush_courtyard_before.jpg',
      afterImage: '/assets/calicut_linebrush_courtyard.jpg',
      description: 'In this traditional courtyard residence, dragging the slider reveals how a flat, untextured plaster wall was sculpted with hand-raked vertical corduroy striations that catch tropical sunlight with organic shadow relief.',
      timeTaken: '5 Days (310 sq.ft wall)'
    },
    {
      id: 'case-cement',
      title: 'Aluva Riverfront Villa: Microcement',
      location: 'Periyar Riverbank, Aluva • Open Veranda & Lounge',
      finishType: 'Damp-Prone Concrete to Waterproof Microcement',
      beforeLabel: 'Before: Unsealed Construction Concrete',
      afterLabel: 'After: Seamless Waterproof Microcement',
      beforeImage: '/assets/kerala_tropical_villa_before.jpg',
      afterImage: '/assets/kerala_tropical_villa.jpg',
      description: 'Located right along the Periyar river with high monsoon moisture. Drag to compare the pavilion before (unsealed, chalky concrete prone to damp patches) and after (seamless, waterproof architectural microcement with a warm sandstone patina).',
      timeTaken: '6 Days (420 sq.ft area)'
    }
  ];

  readonly activeCase = signal(this.cases[0]);
  readonly sliderPosition = signal(50);

  onMouseMove(e: MouseEvent): void {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.sliderPosition.set(pct);
  }

  onTouchMove(e: TouchEvent): void {
    if (e.touches.length > 0) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      this.sliderPosition.set(pct);
    }
  }

  onRangeChange(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    this.sliderPosition.set(val);
  }
}
