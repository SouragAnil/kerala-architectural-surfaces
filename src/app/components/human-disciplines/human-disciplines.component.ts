import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';

@Component({
  selector: 'app-human-disciplines',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="disciplines" class="disciplines-section">
      <div class="site-container-fluid">
        <!-- Section Header -->
        <div class="section-intro">
          <span class="human-pill">Our Core Expertise</span>
          <h2 class="section-title font-serif">The Three Architectural Disciplines</h2>
          <p class="section-subtitle">
            Every surface is hand-troweled by our team of trained master artisans using genuine mineral lime, pulverized marble dust, and hydraulic microcement. Never stamped or rolled.
          </p>
        </div>

        <!-- Disciplines Container -->
        <div class="disciplines-list">
          
          <!-- 01. MARBLE TEXTURE PAINTING -->
          <article id="marble-section" class="discipline-card">
            <div class="card-visual">
              <img 
                [src]="currentMarbleImage()" 
                alt="Venetian marble plaster finish" 
                class="visual-image"
              />
              <div class="visual-badge">01 &bull; Italian Venetian Plaster</div>
            </div>

            <div class="card-body">
              <div class="discipline-kicker">Discipline 01 &bull; Mineral Calcite</div>
              <h3 class="discipline-name font-serif">Marble Texture Painting</h3>
              <p class="discipline-tagline">
                Cool to the touch, translucent depth, and natural delicate veining of genuine quarried stone.
              </p>

              <p class="discipline-text">
                Crafted from aged Italian slaked lime and 98% pure micronized Carrara marble dust. 
                Applied in 3 to 4 paper-thin layers with stainless steel Venetian trowels, burnished under pressure to produce an authentic stone sheen that breathes and does not trap dampness behind the wall.
              </p>

              <!-- Ideal Kerala Spaces -->
              <div class="meta-row">
                <span class="meta-label">Ideal For:</span>
                <span class="meta-value">Living room feature walls, prayer halls, master bedroom bedheads & double-height foyer atriums</span>
              </div>

              <div class="meta-row">
                <span class="meta-label">Application Rate:</span>
                <span class="meta-value rate-highlight">₹290 – ₹420 / sq.ft (Labour + Materials + Wax Sealer)</span>
              </div>

              <!-- Interactive Color/Finish Selector -->
              <div class="variants-selector">
                <span class="variants-title">Popular Textures & Vein Accents:</span>
                <div class="variants-pills">
                  <button 
                    *ngFor="let v of marbleVariants"
                    (click)="selectMarbleVariant(v)"
                    [class.active]="selectedMarbleVariant().finishId === v.finishId"
                    class="variant-btn"
                  >
                    <span class="color-dot" [style.background-color]="v.tone"></span>
                    <span>{{ v.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Actions -->
              <div class="discipline-actions">
                <button (click)="addFinishToSample(selectedMarbleVariant().finishId)" class="btn-human-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add {{ selectedMarbleVariant().name }} to Sample Box
                </button>

                <a 
                  href="https://wa.me/919847082910?text=I%20am%20interested%20in%20Marble%20Texture%20Painting%20({{ selectedMarbleVariant().name }})"
                  target="_blank" 
                  rel="noopener" 
                  class="btn-human-secondary"
                >
                  Consult on Marble Finish
                </a>
              </div>
            </div>
          </article>

          <!-- 02. CEMENT TEXTURE PAINTING -->
          <article id="cement-section" class="discipline-card reverse">
            <div class="card-visual">
              <img 
                [src]="currentCementImage()" 
                alt="Architectural microcement texture wall" 
                class="visual-image"
              />
              <div class="visual-badge">02 &bull; Seamless Microcement</div>
            </div>

            <div class="card-body">
              <div class="discipline-kicker">Discipline 02 &bull; Polymer Silicate</div>
              <h3 class="discipline-name font-serif">Cement Texture Painting</h3>
              <p class="discipline-tagline">
                Raw, industrial tactile warmth with seamless continuity across walls, ceilings, and wet areas.
              </p>

              <p class="discipline-text">
                Formulated with high-strength hydraulic binders, quartz silicates, and flexible polymers. 
                Unlike raw concrete which cracks under tropical heat or attracts green moss, our microcement is 100% waterproof, joint-free, and sealed with a matte polyurethane barrier that resists monsoon staining.
              </p>

              <!-- Ideal Kerala Spaces -->
              <div class="meta-row">
                <span class="meta-label">Ideal For:</span>
                <span class="meta-value">Modern tropical villas, open-plan dining, bathroom wet walls, pool pavilions & exterior accent facades</span>
              </div>

              <div class="meta-row">
                <span class="meta-label">Application Rate:</span>
                <span class="meta-value rate-highlight">₹240 – ₹360 / sq.ft (Complete 4-coat system with hydrophobic primer)</span>
              </div>

              <!-- Interactive Color/Finish Selector -->
              <div class="variants-selector">
                <span class="variants-title">Popular Tones & Densities:</span>
                <div class="variants-pills">
                  <button 
                    *ngFor="let v of cementVariants"
                    (click)="selectCementVariant(v)"
                    [class.active]="selectedCementVariant().finishId === v.finishId"
                    class="variant-btn"
                  >
                    <span class="color-dot" [style.background-color]="v.tone"></span>
                    <span>{{ v.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Actions -->
              <div class="discipline-actions">
                <button (click)="addFinishToSample(selectedCementVariant().finishId)" class="btn-human-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add {{ selectedCementVariant().name }} to Sample Box
                </button>

                <a 
                  href="https://wa.me/919847082910?text=I%20am%20interested%20in%20Cement%20Texture%20Painting%20({{ selectedCementVariant().name }})"
                  target="_blank" 
                  rel="noopener" 
                  class="btn-human-secondary"
                >
                  Consult on Microcement
                </a>
              </div>
            </div>
          </article>

          <!-- 03. LINE BRUSH PAINTING -->
          <article id="linebrush-section" class="discipline-card">
            <div class="card-visual">
              <img 
                [src]="currentBrushImage()" 
                alt="Vertical raked line brush corduroy plaster texture" 
                class="visual-image"
              />
              <div class="visual-badge">03 &bull; Artisanal Line Brush</div>
            </div>

            <div class="card-body">
              <div class="discipline-kicker">Discipline 03 &bull; Linear Combed Relief</div>
              <h3 class="discipline-name font-serif">Line Brush Painting</h3>
              <p class="discipline-tagline">
                Raked corduroy linear striations that create deep, organic shadow play under natural daylight.
              </p>

              <p class="discipline-text">
                Executed using custom steel rakes and horsehair dragging brushes across wet mineral plaster before it cures. 
                The 3-dimensional vertical lines add height and acoustic softening to rooms, catching warm ceiling spotlights and afternoon sunlight with unmatched tactile elegance.
              </p>

              <!-- Ideal Kerala Spaces -->
              <div class="meta-row">
                <span class="meta-label">Ideal For:</span>
                <span class="meta-value">Dining backdrop walls, stairwell tall voids, entry galleries, TV consoles & veranda courtyards</span>
              </div>

              <div class="meta-row">
                <span class="meta-label">Application Rate:</span>
                <span class="meta-value rate-highlight">₹220 – ₹340 / sq.ft (Including acoustic mineral basecoat & raking)</span>
              </div>

              <!-- Interactive Color/Finish Selector -->
              <div class="variants-selector">
                <span class="variants-title">Popular Combed Textures:</span>
                <div class="variants-pills">
                  <button 
                    *ngFor="let v of brushVariants"
                    (click)="selectBrushVariant(v)"
                    [class.active]="selectedBrushVariant().finishId === v.finishId"
                    class="variant-btn"
                  >
                    <span class="color-dot" [style.background-color]="v.tone"></span>
                    <span>{{ v.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Actions -->
              <div class="discipline-actions">
                <button (click)="addFinishToSample(selectedBrushVariant().finishId)" class="btn-human-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add {{ selectedBrushVariant().name }} to Sample Box
                </button>

                <a 
                  href="https://wa.me/919847082910?text=I%20am%20interested%20in%20Line%20Brush%20Painting%20({{ selectedBrushVariant().name }})"
                  target="_blank" 
                  rel="noopener" 
                  class="btn-human-secondary"
                >
                  Consult on Line Brush
                </a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .disciplines-section {
      padding: clamp(3.5rem, 7vw, 6.5rem) 0;
      background-color: var(--bg-primary);
      width: 100%;
    }
    .section-intro {
      text-align: center;
      max-width: 780px;
      margin: 0 auto clamp(2.5rem, 5vw, 4.5rem) auto;
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
      line-height: 1.65;
    }

    .disciplines-list {
      display: flex;
      flex-direction: column;
      gap: clamp(2.5rem, 5vw, 4.5rem);
      width: 100%;
    }

    .discipline-card {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.5rem, 3vw, 3.5rem);
      align-items: center;
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: clamp(1.5rem, 3vw, 3rem);
      box-shadow: var(--shadow-card);
      transition: var(--transition-smooth);
      width: 100%;
    }
    @media (min-width: 992px) {
      .discipline-card {
        grid-template-columns: 1fr 1.2fr;
      }
      .discipline-card.reverse {
        grid-template-columns: 1.2fr 1fr;
      }
      .discipline-card.reverse .card-visual {
        order: 2;
      }
      .discipline-card.reverse .card-body {
        order: 1;
      }
    }
    .discipline-card:hover {
      box-shadow: var(--shadow-hover);
      border-color: var(--border-medium);
    }

    .card-visual {
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      background-color: var(--bg-secondary);
      width: 100%;
    }
    .visual-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .discipline-card:hover .visual-image {
      transform: scale(1.03);
    }
    .visual-badge {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background: rgba(26, 25, 23, 0.88);
      backdrop-filter: blur(8px);
      color: var(--text-light);
      font-size: clamp(0.7rem, 1vw, 0.76rem);
      font-weight: 600;
      letter-spacing: 0.05em;
      padding: 0.4rem 0.85rem;
      border-radius: 4px;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .discipline-kicker {
      font-size: clamp(0.7rem, 1vw, 0.74rem);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent-brass-dark);
      margin-bottom: 0.4rem;
    }
    .discipline-name {
      font-size: clamp(1.5rem, 2.5vw, 2.25rem);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
      letter-spacing: -0.01em;
    }
    .discipline-tagline {
      font-size: clamp(0.95rem, 1.2vw, 1.1rem);
      color: var(--accent-brass-dark);
      font-style: italic;
      margin-bottom: 1.1rem;
      line-height: 1.4;
    }
    .discipline-text {
      font-size: clamp(0.88rem, 1.1vw, 0.98rem);
      line-height: 1.68;
      color: var(--text-secondary);
      margin-bottom: 1.35rem;
    }

    .meta-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.65rem 0;
      border-top: 1px solid var(--border-subtle);
      font-size: clamp(0.8rem, 1vw, 0.88rem);
    }
    @media (min-width: 600px) {
      .meta-row {
        flex-direction: row;
        align-items: baseline;
        gap: 0.75rem;
      }
    }
    .meta-label {
      font-weight: 700;
      color: var(--text-primary);
      min-width: 130px;
      flex-shrink: 0;
    }
    .meta-value {
      color: var(--text-secondary);
    }
    .rate-highlight {
      font-weight: 700;
      color: var(--accent-brass-dark);
    }

    .variants-selector {
      margin-top: 1.25rem;
      margin-bottom: 1.75rem;
      padding: clamp(0.85rem, 2vw, 1.25rem);
      background-color: var(--bg-secondary);
      border-radius: 6px;
    }
    .variants-title {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-secondary);
      margin-bottom: 0.6rem;
    }
    .variants-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .variant-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.45rem 0.85rem;
      background-color: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      font-size: clamp(0.74rem, 1vw, 0.8rem);
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition-smooth);
      min-height: 36px;
    }
    .variant-btn:hover {
      border-color: var(--accent-brass);
      color: var(--text-primary);
    }
    .variant-btn.active {
      background-color: var(--text-primary);
      color: #FFFFFF;
      border-color: var(--text-primary);
    }
    .color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.1);
      flex-shrink: 0;
    }

    .discipline-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    @media (max-width: 600px) {
      .discipline-actions {
        flex-direction: column;
        width: 100%;
      }
      .discipline-actions .btn-human-primary,
      .discipline-actions .btn-human-secondary {
        width: 100%;
      }
    }
  `]
})
export class HumanDisciplinesComponent {
  readonly cartService = inject(SampleCartService);

  readonly marbleVariants = [
    { name: 'Carrara Pure Mist', tone: '#F3F2EE', finishId: 'carrara-mist', sheen: 'Honed Velvet', image: '/assets/carrara_wall.jpg' },
    { name: 'Nero Marquina Gold', tone: '#1C1B1A', finishId: 'nero-marquina', sheen: 'Diamond Polish', image: '/assets/nero_marquina_wall.jpg' },
    { name: 'Emerald Onyx Translucent', tone: '#2A3831', finishId: 'emerald-onyx', sheen: 'Mirror Gloss', image: '/assets/emerald_onyx_interior.jpg' }
  ];
  readonly selectedMarbleVariant = signal(this.marbleVariants[0]);
  readonly currentMarbleImage = signal('/assets/carrara_wall.jpg');

  readonly cementVariants = [
    { name: 'Soft Sandstone Greige', tone: '#D9D3C7', finishId: 'microcement-greige', sheen: 'Matte Hydrophobic', image: '/assets/cement_wall.jpg' },
    { name: 'Brutalist Raw Pitted', tone: '#A8A6A1', finishId: 'raw-concrete', sheen: 'Pitted Natural', image: '/assets/kerala_tropical_villa.jpg' },
    { name: 'Smoked Mineral Charcoal', tone: '#3A3835', finishId: 'smoked-mineral', sheen: 'Satin Velvet', image: '/assets/commercial_kochi_atrium.jpg' }
  ];
  readonly selectedCementVariant = signal(this.cementVariants[0]);
  readonly currentCementImage = signal('/assets/cement_wall.jpg');

  readonly brushVariants = [
    { name: 'Vertical Corduroy White', tone: '#EAE6DD', finishId: 'line-brush-white', sheen: 'Deep 2.5mm Combed', image: '/assets/line_brush_wall.jpg' },
    { name: 'Raked Sand Warm Ochre', tone: '#C8B9A6', finishId: 'line-brush-sand', sheen: 'Medium 1.5mm Rake', image: '/assets/line_brush_macro.jpg' },
    { name: 'Charcoal Accordion Flute', tone: '#32302E', finishId: 'line-brush-charcoal', sheen: 'Fine Combed', image: '/assets/calicut_linebrush_courtyard.jpg' }
  ];
  readonly selectedBrushVariant = signal(this.brushVariants[0]);
  readonly currentBrushImage = signal('/assets/line_brush_wall.jpg');

  selectMarbleVariant(variant: any): void {
    this.selectedMarbleVariant.set(variant);
    this.currentMarbleImage.set(variant.image);
  }

  selectCementVariant(variant: any): void {
    this.selectedCementVariant.set(variant);
    this.currentCementImage.set(variant.image);
  }

  selectBrushVariant(variant: any): void {
    this.selectedBrushVariant.set(variant);
    this.currentBrushImage.set(variant.image);
  }

  addFinishToSample(finishId: string): void {
    const finish = this.cartService.finishes.find(f => f.id === finishId);
    if (finish) {
      this.cartService.toggleFinish(finish);
      this.cartService.isModalOpen.set(true);
    }
  }
}
