import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';

@Component({
  selector: 'app-human-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <!-- Full-Bleed Architectural Photography Background -->
      <div class="hero-image-container">
        <img 
          src="/assets/kerala_backwater_hero.jpg" 
          alt="Alappuzha luxury residence with bookmatched marble plaster wall and pool" 
          class="hero-img"
        />
        <div class="hero-overlay"></div>
      </div>

      <!-- Hero Content Container -->
      <div class="site-container-fluid hero-content-wrapper">
        <div class="hero-card">
          <!-- Editorial Kicker -->
          <div class="kicker-wrapper">
            <span class="human-pill">Architectural Surface Finishes &bull; Kerala</span>
          </div>

          <!-- Headline with Fluid Clamp Scaling -->
          <h1 class="hero-title font-serif">
            Crafting tactile architectural walls for homes in Kerala.
          </h1>

          <!-- Body Description -->
          <p class="hero-description">
            We are master finishers specializing in authentic <strong>Italian marble plaster</strong>, 
            seamless <strong>architectural microcement</strong>, and <strong>raked line-brush textures</strong>. 
            Formulated with breathable natural slaked lime and micro-silicates engineered specifically to endure Kerala's 95% coastal humidity without peeling or mold.
          </p>

          <!-- Action Buttons -->
          <div class="hero-actions">
            <a href="#disciplines" class="btn-human-primary">
              Explore The 3 Finishes
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>

            <button (click)="openSampleBox()" class="btn-human-secondary">
              Order 3-Tile Sample Box
            </button>

            <a 
              href="https://wa.me/919847082910?text=Hello%2C%20I%20would%20like%20to%20consult%20on%20wall%20textures%20for%20my%20villa%20in%20Kerala" 
              target="_blank" 
              rel="noopener" 
              class="btn-whatsapp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.077-2.115-.494-1.815-.731-2.986-2.583-3.076-2.705-.09-.12-1.226-1.632-1.226-3.113 0-1.481.764-2.207 1.036-2.505.272-.298.594-.372.793-.372.199 0 .399.002.572.01.184.01.431-.07.674.516.252.61.859 2.095.934 2.247.075.152.126.331.025.531-.1.2-.15.324-.298.5-.149.176-.312.392-.446.526-.149.149-.304.312-.131.609.173.298.771 1.272 1.654 2.059 1.134 1.011 2.088 1.324 2.386 1.473.298.15.472.125.646-.075.174-.2.747-.872.946-1.171.199-.298.398-.249.671-.15.273.1 1.734.818 2.032.968.298.15.497.225.572.35.075.125.075.725-.069 1.13z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          <!-- Credibility Stats Strip -->
          <div class="trust-grid">
            <div class="trust-item">
              <span class="trust-number font-serif">380+</span>
              <span class="trust-label">Kerala Residences Finished</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-number font-serif">10 Yrs</span>
              <span class="trust-label">Monsoon Warranty</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-number font-serif">₹220</span>
              <span class="trust-label">Starting / sq.ft with Application</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-number font-serif">48 Hrs</span>
              <span class="trust-label">Sample Delivery in Kerala</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Jump bar at bottom of hero -->
      <div class="quick-disciplines-bar">
        <div class="site-container-fluid quick-disciplines-content">
          <span class="quick-title">Specialized Disciplines:</span>
          
          <a href="#marble-section" class="quick-link">
            <span class="quick-dot dot-marble"></span>
            <strong>01. Marble Texture Painting</strong>
            <span class="quick-sub">(Venetian Stucco, Carrara, Veined Onyx)</span>
          </a>

          <a href="#cement-section" class="quick-link">
            <span class="quick-dot dot-cement"></span>
            <strong>02. Cement Texture Painting</strong>
            <span class="quick-sub">(Seamless Microcement, Pitted Concrete)</span>
          </a>

          <a href="#linebrush-section" class="quick-link">
            <span class="quick-dot dot-brush"></span>
            <strong>03. Line Brush Painting</strong>
            <span class="quick-sub">(Vertical Corduroy, Raked Plaster)</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      min-height: 100dvh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      background-color: var(--bg-secondary);
    }
    .hero-image-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(250, 248, 245, 0.98) 0%,
        rgba(250, 248, 245, 0.94) 45%,
        rgba(250, 248, 245, 0.65) 75%,
        rgba(250, 248, 245, 0.25) 100%
      );
    }
    @media (max-width: 900px) {
      .hero-overlay {
        background: rgba(250, 248, 245, 0.94);
      }
    }

    .hero-content-wrapper {
      position: relative;
      z-index: 2;
      padding-top: clamp(2.5rem, 6vh, 5.5rem);
      padding-bottom: clamp(2rem, 4vh, 3.5rem);
      display: flex;
      align-items: center;
      flex-grow: 1;
    }

    .hero-card {
      width: 100%;
      max-width: 820px;
    }

    .kicker-wrapper {
      margin-bottom: 1.25rem;
    }

    .hero-title {
      font-size: clamp(2.1rem, 4.2vw, 3.8rem);
      line-height: 1.15;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }

    .hero-description {
      font-size: clamp(0.95rem, 1.3vw, 1.15rem);
      line-height: 1.68;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      max-width: 720px;
    }
    .hero-description strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 600px) {
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .hero-actions .btn-human-primary,
      .hero-actions .btn-human-secondary,
      .hero-actions .btn-whatsapp {
        width: 100%;
      }
    }

    .trust-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      padding-top: 1.75rem;
      border-top: 1px solid var(--border-subtle);
      width: 100%;
      max-width: 700px;
    }
    @media (min-width: 680px) {
      .trust-grid {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
    }
    .trust-item {
      display: flex;
      flex-direction: column;
    }
    .trust-number {
      font-size: clamp(1.3rem, 2.5vw, 1.65rem);
      font-weight: 700;
      color: var(--accent-brass-dark);
      line-height: 1.1;
    }
    .trust-label {
      font-size: clamp(0.72rem, 1.1vw, 0.8rem);
      color: var(--text-muted);
      margin-top: 3px;
    }
    .trust-divider {
      display: none;
      width: 1px;
      height: 32px;
      background-color: var(--border-medium);
    }
    @media (min-width: 680px) {
      .trust-divider {
        display: block;
      }
    }

    /* Quick jump strip at the base of the hero */
    .quick-disciplines-bar {
      position: relative;
      z-index: 2;
      background-color: var(--bg-card);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      padding: 0.9rem 0;
      box-shadow: var(--shadow-subtle);
      width: 100%;
    }
    .quick-disciplines-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 3px;
    }
    .quick-disciplines-content::-webkit-scrollbar {
      display: none;
    }
    .quick-title {
      font-size: 0.76rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .quick-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.82rem;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.35rem 0.6rem;
      border-radius: 4px;
      transition: var(--transition-smooth);
      flex-shrink: 0;
    }
    .quick-link:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
    .quick-sub {
      color: var(--text-muted);
      font-size: 0.75rem;
    }
    .quick-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dot-marble { background-color: #A27F4C; }
    .dot-cement { background-color: #7D868F; }
    .dot-brush { background-color: #8C7A6B; }
  `]
})
export class HumanHeroComponent {
  readonly cartService = inject(SampleCartService);

  openSampleBox(): void {
    this.cartService.isModalOpen.set(true);
  }
}
