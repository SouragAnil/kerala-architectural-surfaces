import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RateItem {
  discipline: string;
  name: string;
  ratePerSqFt: number;
  rateRange: string;
  includes: string[];
  curingTime: string;
  warranty: string;
}

@Component({
  selector: 'app-human-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="pricing-specs" class="pricing-section">
      <div class="site-container-fluid">
        <!-- Section Header -->
        <div class="section-intro">
          <span class="human-pill">Honest & Transparent Rates</span>
          <h2 class="section-title font-serif">Kerala Application Pricing Guide</h2>
          <p class="section-subtitle">
            No hidden fees or contractor markups. All rates include authentic imported mineral powders, surface preparation, primer, master artisan labour, and final weatherproofing sealant.
          </p>
        </div>

        <!-- Two Column: Cost Estimator + Rate Cards -->
        <div class="pricing-layout">
          <!-- Left: Interactive Wall Cost Calculator -->
          <div class="calculator-card">
            <div class="calc-header">
              <span class="calc-tag">Quick Estimate Tool</span>
              <h3 class="calc-title font-serif">Wall Cost Estimator</h3>
              <p class="calc-subtitle">Calculate the approximate investment for your Kerala home project.</p>
            </div>

            <div class="calc-form">
              <!-- Select Technique -->
              <div class="form-group">
                <label class="form-label">1. Select Desired Finish:</label>
                <div class="radio-options">
                  <label class="radio-label" [class.selected]="selectedTechnique() === 'marble'">
                    <input 
                      type="radio" 
                      name="technique" 
                      value="marble" 
                      [checked]="selectedTechnique() === 'marble'"
                      (change)="onTechniqueChange('marble')"
                    />
                    <div>
                      <strong>Marble Texture Painting</strong>
                      <span class="radio-hint">Italian Venetian Plaster (Avg ₹340 / sq.ft)</span>
                    </div>
                  </label>

                  <label class="radio-label" [class.selected]="selectedTechnique() === 'cement'">
                    <input 
                      type="radio" 
                      name="technique" 
                      value="cement" 
                      [checked]="selectedTechnique() === 'cement'"
                      (change)="onTechniqueChange('cement')"
                    />
                    <div>
                      <strong>Cement Texture Painting</strong>
                      <span class="radio-hint">Seamless Microcement (Avg ₹290 / sq.ft)</span>
                    </div>
                  </label>

                  <label class="radio-label" [class.selected]="selectedTechnique() === 'brush'">
                    <input 
                      type="radio" 
                      name="technique" 
                      value="brush" 
                      [checked]="selectedTechnique() === 'brush'"
                      (change)="onTechniqueChange('brush')"
                    />
                    <div>
                      <strong>Line Brush Painting</strong>
                      <span class="radio-hint">Raked Corduroy Finish (Avg ₹270 / sq.ft)</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Enter Dimensions -->
              <div class="form-group">
                <div class="dim-header">
                  <label class="form-label">2. Wall Area (Sq.Ft):</label>
                  <span class="area-display font-serif">{{ wallArea() }} sq.ft</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1500" 
                  step="10" 
                  [value]="wallArea()" 
                  (input)="onAreaSlider($event)"
                  class="area-slider"
                />
                <div class="slider-markers">
                  <span>50 sq.ft</span>
                  <span>180 sq.ft (Living)</span>
                  <span>500 sq.ft (Double height)</span>
                  <span>1500 sq.ft</span>
                </div>
              </div>

              <!-- Live Estimate Summary Box -->
              <div class="estimate-result-box">
                <div class="estimate-row">
                  <span class="est-label">Estimated Total Investment:</span>
                  <span class="est-amount font-serif">₹{{ estimatedTotal() | number }}*</span>
                </div>
                <div class="breakdown-list">
                  <div class="b-item">
                    <span>Authentic Mineral Formulation:</span>
                    <span>₹{{ materialCost() | number }}</span>
                  </div>
                  <div class="b-item">
                    <span>Certified Master Artisan Labour:</span>
                    <span>₹{{ labourCost() | number }}</span>
                  </div>
                  <div class="b-item">
                    <span>Surface Prep & Anti-Monsoon Sealer:</span>
                    <span>Included</span>
                  </div>
                </div>
                <p class="est-note">
                  *Exact quotation provided post site inspection for wall moisture and surface plumb in Ernakulam, Kozhikode, and Trivandrum.
                </p>

                <div class="calc-action">
                  <a 
                    [href]="whatsappQuoteLink()" 
                    target="_blank" 
                    rel="noopener" 
                    class="btn-whatsapp w-100"
                  >
                    Send This Estimate to Our Finisher on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Clear Rate Cards & Specs -->
          <div class="rates-column">
            <h3 class="rates-col-title font-serif">Standard Rate Cards & Durability</h3>
            
            <div class="rate-cards-stack">
              <div *ngFor="let r of rateCards" class="rate-card">
                <div class="rate-card-header">
                  <div>
                    <span class="rate-disc">{{ r.discipline }}</span>
                    <h4 class="rate-name font-serif">{{ r.name }}</h4>
                  </div>
                  <div class="rate-price-tag">
                    <span class="price-val">{{ r.rateRange }}</span>
                    <span class="price-unit">per sq.ft applied</span>
                  </div>
                </div>

                <ul class="includes-list">
                  <li *ngFor="let inc of r.includes">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ inc }}</span>
                  </li>
                </ul>

                <div class="rate-footer-meta">
                  <span><strong>Curing Time:</strong> {{ r.curingTime }}</span>
                  <span><strong>Warranty:</strong> {{ r.warranty }}</span>
                </div>
              </div>
            </div>

            <!-- Monsoon Durability Guarantee Box -->
            <div class="monsoon-box">
              <div class="monsoon-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <div class="monsoon-content">
                <h4 class="monsoon-title">Kerala Tropical Monsoon Formulation</h4>
                <p class="monsoon-text">
                  Unlike conventional acrylic emulsions that trap rising dampness causing bubble peeling and black mold, our mineral lime matrices are naturally alkaline (pH 12+) and micro-porous. Mold and fungus cannot biologically grow on genuine slaked lime surfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing-section {
      padding: clamp(3.5rem, 7vw, 6.5rem) 0;
      background-color: var(--bg-secondary);
      border-top: 1px solid var(--border-subtle);
      width: 100%;
    }
    .section-intro {
      text-align: center;
      max-width: 780px;
      margin: 0 auto clamp(2rem, 4vw, 3.5rem) auto;
    }
    .section-title {
      font-size: clamp(1.85rem, 3.5vw, 2.75rem);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0.85rem 0 0.5rem 0;
      letter-spacing: -0.01em;
    }
    .section-subtitle {
      font-size: clamp(0.9rem, 1.2vw, 1.05rem);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .pricing-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.75rem, 3vw, 3.5rem);
      align-items: start;
      width: 100%;
    }
    @media (min-width: 1024px) {
      .pricing-layout {
        grid-template-columns: 1fr 1.15fr;
      }
    }

    .calculator-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: clamp(1.5rem, 3vw, 2.5rem);
      box-shadow: var(--shadow-card);
      width: 100%;
    }
    .calc-tag {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent-brass-dark);
    }
    .calc-title {
      font-size: clamp(1.35rem, 2vw, 1.75rem);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0.2rem 0 0.4rem 0;
    }
    .calc-subtitle {
      font-size: clamp(0.82rem, 1vw, 0.9rem);
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .radio-options {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .radio-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      cursor: pointer;
      transition: var(--transition-smooth);
      min-height: 48px;
    }
    .radio-label:hover {
      border-color: var(--accent-brass);
    }
    .radio-label.selected {
      background-color: #F6F1EA;
      border-color: var(--accent-brass-dark);
    }
    .radio-hint {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 1px;
    }

    .dim-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.5rem;
    }
    .area-display {
      font-size: clamp(1.2rem, 2vw, 1.5rem);
      font-weight: 700;
      color: var(--accent-brass-dark);
    }
    .area-slider {
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: var(--border-medium);
      outline: none;
      margin: 0.5rem 0;
      accent-color: var(--accent-brass);
      cursor: pointer;
    }
    .slider-markers {
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .estimate-result-box {
      margin-top: 1.5rem;
      padding: clamp(1.2rem, 2vw, 1.75rem);
      background-color: #F8F5EE;
      border: 1px solid var(--border-medium);
      border-radius: 6px;
    }
    .estimate-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-medium);
      margin-bottom: 0.75rem;
    }
    .est-label {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .est-amount {
      font-size: clamp(1.5rem, 2.5vw, 1.95rem);
      font-weight: 700;
      color: var(--accent-brass-dark);
    }
    .breakdown-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin-bottom: 0.85rem;
    }
    .b-item {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    .est-note {
      font-size: 0.72rem;
      color: var(--text-muted);
      line-height: 1.45;
      margin-bottom: 1.25rem;
    }
    .w-100 {
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    .rates-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }
    .rates-col-title {
      font-size: clamp(1.35rem, 2vw, 1.65rem);
      font-weight: 600;
      color: var(--text-primary);
    }
    .rate-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }
    .rate-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: clamp(1.2rem, 2vw, 1.65rem);
      box-shadow: var(--shadow-subtle);
      width: 100%;
    }
    .rate-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .rate-disc {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-brass-dark);
    }
    .rate-name {
      font-size: clamp(1.05rem, 1.5vw, 1.25rem);
      font-weight: 600;
      color: var(--text-primary);
    }
    .rate-price-tag {
      text-align: left;
    }
    @media (min-width: 600px) {
      .rate-price-tag {
        text-align: right;
      }
    }
    .price-val {
      display: block;
      font-size: clamp(1.1rem, 1.5vw, 1.25rem);
      font-weight: 700;
      color: var(--text-primary);
    }
    .price-unit {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .includes-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: clamp(0.78rem, 1vw, 0.84rem);
      color: var(--text-secondary);
    }
    .includes-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .includes-list li svg {
      flex-shrink: 0;
      margin-top: 3px;
    }

    .rate-footer-meta {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .monsoon-box {
      display: flex;
      gap: 1.25rem;
      background-color: #EFE8DC;
      border: 1px solid var(--border-medium);
      border-radius: 6px;
      padding: clamp(1.1rem, 2vw, 1.5rem);
      margin-top: 0.5rem;
      width: 100%;
    }
    .monsoon-icon {
      color: var(--accent-brass-dark);
      flex-shrink: 0;
      padding-top: 2px;
    }
    .monsoon-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.35rem;
    }
    .monsoon-text {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.55;
    }
  `]
})
export class HumanPricingComponent {
  readonly selectedTechnique = signal<'marble' | 'cement' | 'brush'>('marble');
  readonly wallArea = signal<number>(200);

  readonly rateCards: RateItem[] = [
    {
      discipline: 'Discipline 01',
      name: 'Marble Texture Painting (Italian Stucco)',
      ratePerSqFt: 340,
      rateRange: '₹290 – ₹420',
      includes: [
        'Imported slaked lime & 98% micronized Carrara calcite dust',
        'Multi-coat stainless steel spatula burnishing',
        'Natural carnauba wax seal for tactile gloss and moisture repellent',
        'Full masking of floors, architraves, and switches'
      ],
      curingTime: '48 Hours to full cure',
      warranty: '15-Year Adhesion & Colorfast Warranty'
    },
    {
      discipline: 'Discipline 02',
      name: 'Cement Texture Painting (Seamless Microcement)',
      ratePerSqFt: 290,
      rateRange: '₹240 – ₹360',
      includes: [
        'High-density hydraulic polymer-modified micro-mortar',
        'Fibreglass anti-crack reinforcement mesh underlay',
        'Dual-coat aliphatic polyurethane matte waterproofing seal',
        'Zero grout lines: seamless continuity across walls & niches'
      ],
      curingTime: '24 Hours touch-dry',
      warranty: '10-Year Water Resistance Warranty'
    },
    {
      discipline: 'Discipline 03',
      name: 'Line Brush Painting (Artisanal Combed Relief)',
      ratePerSqFt: 270,
      rateRange: '₹220 – ₹340',
      includes: [
        'Thick-bodied acoustic mineral plaster formulation',
        'Manual steel comb & raking tool vertical striation',
        'Anti-dust matte hydrophobic topcoat',
        'Enhances depth under wall washers and natural sunlight'
      ],
      curingTime: '36 Hours full cure',
      warranty: '10-Year Texture Durability Warranty'
    }
  ];

  onTechniqueChange(tech: 'marble' | 'cement' | 'brush'): void {
    this.selectedTechnique.set(tech);
  }

  onAreaSlider(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    this.wallArea.set(val);
  }

  readonly currentRatePerSqFt = computed(() => {
    switch (this.selectedTechnique()) {
      case 'marble': return 340;
      case 'cement': return 290;
      case 'brush': return 270;
      default: return 300;
    }
  });

  readonly estimatedTotal = computed(() => {
    return this.wallArea() * this.currentRatePerSqFt();
  });

  readonly materialCost = computed(() => {
    return Math.round(this.estimatedTotal() * 0.52);
  });

  readonly labourCost = computed(() => {
    return Math.round(this.estimatedTotal() * 0.48);
  });

  readonly whatsappQuoteLink = computed(() => {
    const techName = this.selectedTechnique() === 'marble' 
      ? 'Marble Texture Painting' 
      : this.selectedTechnique() === 'cement' 
        ? 'Cement Texture Painting' 
        : 'Line Brush Painting';
    const area = this.wallArea();
    const total = this.estimatedTotal();
    const msg = encodeURIComponent(
      `Hello Kerala Architectural Surfaces,\nI estimated my project on your website:\n- Finish: ${techName}\n- Wall Area: ${area} sq.ft\n- Estimated Amount: ₹${total.toLocaleString()}\n\nCan we schedule a site visit or discuss samples?`
    );
    return `https://wa.me/919847082910?text=${msg}`;
  });
}
