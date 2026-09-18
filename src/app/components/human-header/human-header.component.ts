import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';

@Component({
  selector: 'app-human-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top Announcement & Contact Bar -->
    <div class="top-bar">
      <div class="site-container-fluid top-bar-content">
        <div class="contact-info">
          <span class="location-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Showrooms: Kochi &bull; Calicut &bull; Trivandrum
          </span>
          <span class="divider">|</span>
          <a href="tel:+919847082910" class="phone-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            +91 98470 82910
          </a>
        </div>
        <div class="top-bar-right">
          <span class="monsoon-proof">100% Kerala Monsoon & Mold Resistant</span>
          <a href="https://wa.me/919847082910?text=Hi%2C%20I%20am%20interested%20in%20architectural%20wall%20textures%20for%20my%20project%20in%20Kerala" 
             target="_blank" 
             rel="noopener" 
             class="whatsapp-top-link">
            WhatsApp Senior Finisher
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="main-header">
      <div class="site-container-fluid header-inner">
        <!-- Brand Logo -->
        <a href="#" class="brand-logo">
          <span class="brand-name font-serif">KERALA ARCHITECTURAL SURFACES</span>
          <span class="brand-subtitle">Marble Stucco &bull; Microcement &bull; Line Brush Textures</span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-links">
          <a href="#disciplines" class="nav-item">The Three Finishes</a>
          <a href="#before-after" class="nav-item">Before & After</a>
          <a href="#kerala-projects" class="nav-item">Kerala Portfolio</a>
          <a href="#pricing-specs" class="nav-item">Pricing & Specs</a>
          <a href="#experience-centers" class="nav-item">Showrooms</a>
        </nav>

        <!-- Desktop & Mobile Actions -->
        <div class="header-actions">
          <button (click)="openSampleBox()" class="sample-box-btn" aria-label="View Sample Box">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span class="btn-text">Sample Box</span>
            <span class="sample-counter" *ngIf="cartService.itemCount() > 0">
              {{ cartService.itemCount() }}
            </span>
          </button>

          <a href="#consultation" class="btn-consultation">
            Book Site Visit
          </a>

          <!-- Mobile Hamburger Toggle Button -->
          <button 
            type="button" 
            class="mobile-menu-toggle" 
            (click)="toggleMobileMenu()" 
            [class.active]="isMobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <span class="bar bar-1"></span>
            <span class="bar bar-2"></span>
            <span class="bar bar-3"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="isMobileMenuOpen()">
        <div class="mobile-nav-inner">
          <nav class="mobile-nav-links">
            <a href="#disciplines" (click)="closeMobileMenu()" class="mobile-nav-item">
              <span class="nav-num">01</span>
              <span>The Three Finishes</span>
            </a>
            <a href="#before-after" (click)="closeMobileMenu()" class="mobile-nav-item">
              <span class="nav-num">02</span>
              <span>Before & After</span>
            </a>
            <a href="#kerala-projects" (click)="closeMobileMenu()" class="mobile-nav-item">
              <span class="nav-num">03</span>
              <span>Kerala Portfolio</span>
            </a>
            <a href="#pricing-specs" (click)="closeMobileMenu()" class="mobile-nav-item">
              <span class="nav-num">04</span>
              <span>Pricing & Specs</span>
            </a>
            <a href="#experience-centers" (click)="closeMobileMenu()" class="mobile-nav-item">
              <span class="nav-num">05</span>
              <span>Kerala Showrooms</span>
            </a>
          </nav>

          <div class="mobile-cta-group">
            <a href="#consultation" (click)="closeMobileMenu()" class="btn-human-primary w-100">
              Book Site Visit
            </a>
            <a 
              href="https://wa.me/919847082910?text=Hi%2C%20I%20would%20like%20to%20consult%20on%20wall%20textures%20for%20my%20project%20in%20Kerala" 
              target="_blank" 
              rel="noopener" 
              class="btn-whatsapp w-100"
            >
              WhatsApp Senior Finisher
            </a>
            <div class="mobile-contact-note">
              <span>Direct Studio Line:</span>
              <a href="tel:+919847082910">+91 98470 82910</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .top-bar {
      background-color: var(--bg-dark);
      color: var(--text-light-muted);
      font-size: 0.76rem;
      padding: 0.45rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      width: 100%;
    }
    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .contact-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .location-badge, .phone-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--text-light-muted);
      text-decoration: none;
    }
    .phone-link:hover {
      color: #FFFFFF;
    }
    .divider {
      color: rgba(255, 255, 255, 0.2);
    }
    .top-bar-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .monsoon-proof {
      color: var(--accent-brass-light);
      font-weight: 500;
    }
    .whatsapp-top-link {
      color: #25D366;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }
    .whatsapp-top-link:hover {
      color: #5cf194;
    }

    .main-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: rgba(250, 248, 245, 0.98);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-subtle);
      transition: var(--transition-smooth);
      width: 100%;
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      padding-bottom: 1rem;
      gap: 1rem;
    }
    .brand-logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      min-width: 0;
    }
    .brand-name {
      font-size: clamp(0.95rem, 2vw, 1.25rem);
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .brand-subtitle {
      font-size: clamp(0.65rem, 1.2vw, 0.74rem);
      letter-spacing: 0.03em;
      color: var(--text-muted);
      margin-top: 2px;
      white-space: nowrap;
    }

    .nav-links {
      display: none;
      gap: clamp(1rem, 2vw, 2.25rem);
      align-items: center;
    }
    @media (min-width: 1060px) {
      .nav-links {
        display: flex;
      }
    }
    .nav-item {
      font-size: clamp(0.82rem, 1.1vw, 0.9rem);
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      position: relative;
      padding: 0.25rem 0;
      transition: color 0.2s;
      white-space: nowrap;
    }
    .nav-item:hover {
      color: var(--accent-brass-dark);
    }
    .nav-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent-brass);
      transition: width 0.3s ease;
    }
    .nav-item:hover::after {
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }
    .sample-box-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 0.95rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 4px;
      color: var(--text-primary);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
      min-height: 40px;
    }
    .sample-box-btn:hover {
      background-color: #EDE7DC;
      border-color: var(--accent-brass);
    }
    .sample-counter {
      background-color: var(--accent-brass);
      color: #FFFFFF;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: 700;
    }

    .btn-consultation {
      display: none;
      align-items: center;
      padding: 0.6rem 1.25rem;
      background-color: var(--text-primary);
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      border-radius: 4px;
      text-decoration: none;
      transition: var(--transition-smooth);
      white-space: nowrap;
      min-height: 40px;
    }
    @media (min-width: 680px) {
      .btn-consultation {
        display: inline-flex;
      }
    }
    .btn-consultation:hover {
      background-color: var(--accent-brass-dark);
      transform: translateY(-1px);
    }

    /* Mobile Hamburger Button */
    .mobile-menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
    }
    @media (min-width: 1060px) {
      .mobile-menu-toggle {
        display: none;
      }
    }
    .bar {
      width: 100%;
      height: 2px;
      background-color: var(--text-primary);
      transition: all 0.3s ease;
    }
    .mobile-menu-toggle.active .bar-1 {
      transform: translateY(7px) rotate(45deg);
    }
    .mobile-menu-toggle.active .bar-2 {
      opacity: 0;
    }
    .mobile-menu-toggle.active .bar-3 {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* Mobile Drawer */
    .mobile-drawer {
      display: block;
      max-height: 0;
      overflow: hidden;
      background-color: #FAF8F5;
      border-bottom: 0 solid var(--border-medium);
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-bottom 0.4s ease;
    }
    @media (min-width: 1060px) {
      .mobile-drawer {
        display: none;
      }
    }
    .mobile-drawer.open {
      max-height: 600px;
      border-bottom: 1px solid var(--border-medium);
    }
    .mobile-nav-inner {
      padding: 1.5rem 1.25rem 2rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .mobile-nav-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-primary);
      text-decoration: none;
      padding: 0.4rem 0;
      border-bottom: 1px solid var(--border-subtle);
    }
    .nav-num {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-brass-dark);
    }
    .mobile-cta-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .w-100 {
      width: 100%;
      text-align: center;
    }
    .mobile-contact-note {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: var(--text-muted);
      padding-top: 0.5rem;
    }
    .mobile-contact-note a {
      color: var(--accent-brass-dark);
      font-weight: 700;
      text-decoration: none;
    }

    @media (max-width: 580px) {
      .top-bar-right {
        display: none;
      }
      .brand-subtitle {
        display: none;
      }
      .sample-box-btn .btn-text {
        display: none;
      }
      .sample-box-btn {
        padding: 0.55rem;
      }
    }
  `]
})
export class HumanHeaderComponent {
  readonly cartService = inject(SampleCartService);
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  openSampleBox(): void {
    this.closeMobileMenu();
    this.cartService.isModalOpen.set(true);
  }
}
