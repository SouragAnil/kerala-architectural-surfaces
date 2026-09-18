import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectItem {
  id: string;
  title: string;
  category: 'marble' | 'cement' | 'brush';
  categoryLabel: string;
  location: string;
  architect: string;
  area: string;
  finishSummary: string;
  image: string;
}

@Component({
  selector: 'app-human-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="kerala-projects" class="projects-section">
      <div class="site-container-fluid">
        <!-- Section Header -->
        <div class="section-intro">
          <div class="intro-left">
            <span class="human-pill">Completed Residences & Spaces</span>
            <h2 class="section-title font-serif">Kerala Project Monograph</h2>
            <p class="section-subtitle">
              Over 380 bespoke homes across Kerala trust our artisans to elevate their interior and exterior architecture. Browse selected works by discipline.
            </p>
          </div>

          <!-- Category Filter Pills -->
          <div class="filter-pills-wrap">
            <div class="filter-pills">
              <button 
                (click)="activeFilter.set('all')" 
                [class.active]="activeFilter() === 'all'"
                class="filter-btn"
              >
                All Works (5)
              </button>
              <button 
                (click)="activeFilter.set('marble')" 
                [class.active]="activeFilter() === 'marble'"
                class="filter-btn"
              >
                Marble Stucco
              </button>
              <button 
                (click)="activeFilter.set('cement')" 
                [class.active]="activeFilter() === 'cement'"
                class="filter-btn"
              >
                Microcement
              </button>
              <button 
                (click)="activeFilter.set('brush')" 
                [class.active]="activeFilter() === 'brush'"
                class="filter-btn"
              >
                Line Brush
              </button>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <article 
            *ngFor="let proj of filteredProjects()" 
            class="project-card"
          >
            <div class="img-wrapper">
              <img [src]="proj.image" [alt]="proj.title" class="project-img" />
              <span class="category-tag">{{ proj.categoryLabel }}</span>
            </div>

            <div class="card-content">
              <div class="card-meta">
                <span class="location">{{ proj.location }}</span>
                <span class="area">{{ proj.area }}</span>
              </div>
              <h3 class="project-name font-serif">{{ proj.title }}</h3>
              <p class="project-summary">{{ proj.finishSummary }}</p>
              
              <div class="arch-credit">
                <span class="arch-label">Architectural Collaboration:</span>
                <span class="arch-name">{{ proj.architect }}</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Kerala Architect Trust Banner -->
        <div class="architect-trust-banner">
          <div class="banner-content">
            <div class="banner-text">
              <h3 class="banner-title font-serif">Are you an Architect or Interior Designer in Kerala?</h3>
              <p class="banner-desc">
                We provide custom on-site mockup panels (18" &times; 18"), technical substrate inspection, and direct liaison with your site supervisors in Kochi, Calicut, and Trivandrum.
              </p>
            </div>
            <div class="banner-cta">
              <a 
                href="https://wa.me/919847082910?text=Hello%2C%20I%20am%20an%20architect%20in%20Kerala%20and%20would%20like%20to%20request%20sample%20panels%20and%20collaboration%20details." 
                target="_blank" 
                rel="noopener" 
                class="btn-human-primary"
              >
                Request Architectural Sample Kit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: clamp(3.5rem, 7vw, 6.5rem) 0;
      background-color: var(--bg-primary);
      width: 100%;
    }
    .section-intro {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: clamp(2rem, 4vw, 3.5rem);
    }
    @media (min-width: 992px) {
      .section-intro {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
    .intro-left {
      max-width: 720px;
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

    .filter-pills-wrap {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
    }
    .filter-pills-wrap::-webkit-scrollbar {
      display: none;
    }
    .filter-pills {
      display: flex;
      gap: 0.5rem;
      white-space: nowrap;
    }
    .filter-btn {
      padding: 0.55rem 1.05rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      font-size: clamp(0.76rem, 1vw, 0.84rem);
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition-smooth);
      min-height: 38px;
    }
    .filter-btn:hover {
      border-color: var(--accent-brass);
      color: var(--text-primary);
    }
    .filter-btn.active {
      background-color: var(--text-primary);
      color: #FFFFFF;
      border-color: var(--text-primary);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.25rem, 2.5vw, 2.25rem);
      width: 100%;
    }
    @media (min-width: 640px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1100px) {
      .projects-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .project-card:first-child {
        grid-column: span 2;
      }
    }
    @media (min-width: 1600px) {
      .projects-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      .project-card:first-child {
        grid-column: span 2;
      }
    }

    .project-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      overflow: hidden;
      box-shadow: var(--shadow-subtle);
      transition: var(--transition-smooth);
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .project-card:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
      border-color: var(--border-medium);
    }

    .img-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      background-color: var(--bg-secondary);
      overflow: hidden;
    }
    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .project-card:hover .project-img {
      transform: scale(1.04);
    }
    .category-tag {
      position: absolute;
      top: 0.85rem;
      left: 0.85rem;
      background: rgba(26, 25, 23, 0.85);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.3rem 0.65rem;
      border-radius: 3px;
      letter-spacing: 0.04em;
    }

    .card-content {
      padding: clamp(1.2rem, 2vw, 1.75rem);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-brass-dark);
      margin-bottom: 0.45rem;
    }
    .project-name {
      font-size: clamp(1.15rem, 1.8vw, 1.35rem);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    .project-summary {
      font-size: clamp(0.85rem, 1vw, 0.9rem);
      color: var(--text-secondary);
      line-height: 1.58;
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }
    .arch-credit {
      padding-top: 0.85rem;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .arch-label {
      color: var(--text-muted);
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .arch-name {
      color: var(--text-primary);
      font-weight: 600;
    }

    .architect-trust-banner {
      margin-top: clamp(3rem, 6vw, 4.5rem);
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      border-radius: 8px;
      padding: clamp(1.5rem, 3.5vw, 2.75rem);
      width: 100%;
    }
    .banner-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-start;
    }
    @media (min-width: 900px) {
      .banner-content {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .banner-text {
      max-width: 800px;
    }
    .banner-title {
      font-size: clamp(1.25rem, 2vw, 1.55rem);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }
    .banner-desc {
      font-size: clamp(0.86rem, 1vw, 0.94rem);
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .banner-cta {
      flex-shrink: 0;
      width: 100%;
    }
    @media (min-width: 900px) {
      .banner-cta {
        width: auto;
      }
    }
  `]
})
export class HumanProjectsComponent {
  readonly activeFilter = signal<'all' | 'marble' | 'cement' | 'brush'>('all');

  readonly projects: ProjectItem[] = [
    {
      id: 'proj-1',
      title: 'Backwater Villa Pavilion & Infinity Terrace',
      category: 'marble',
      categoryLabel: 'Marble Texture Painting',
      location: 'Vembanad Lake, Alappuzha',
      architect: 'Ar. Venu Pillai, Studio Monsoon Kochi',
      area: '620 sq.ft feature wall',
      finishSummary: 'Bookmatched Italian Carrara marble stucco with delicate grey veining, polished with natural beeswax to resist backwater humidity.',
      image: '/assets/kerala_backwater_hero.jpg'
    },
    {
      id: 'proj-2',
      title: 'Tropical Courtyard House',
      category: 'brush',
      categoryLabel: 'Line Brush Painting',
      location: 'Mavoor Road, Kozhikode',
      architect: 'Ar. Shabana Rahiman, Calicut Design Collective',
      area: '340 sq.ft courtyard void',
      finishSummary: 'Hand-combed vertical corduroy line brush plaster in warm sandstone tone, positioned behind traditional terracotta jaali screens.',
      image: '/assets/calicut_linebrush_courtyard.jpg'
    },
    {
      id: 'proj-3',
      title: 'Riverfront Minimalist Residence',
      category: 'cement',
      categoryLabel: 'Cement Texture Painting',
      location: 'Periyar Riverbank, Aluva',
      architect: 'Ar. Thomas Kurian, Kochi Architecture Guild',
      area: '1,200 sq.ft walls & living floor',
      finishSummary: 'Seamless raw architectural microcement with soft clouding and polyurethane matte seal, connecting the indoor lounge to the rain pool.',
      image: '/assets/kerala_tropical_villa.jpg'
    },
    {
      id: 'proj-4',
      title: 'Marine Drive High-Rise Penthouse',
      category: 'marble',
      categoryLabel: 'Marble Texture Painting',
      location: 'Marine Drive, Ernakulam',
      architect: 'Ar. Deepa Menon, Menon & Associates',
      area: '280 sq.ft living room wall',
      finishSummary: 'Custom warm beige travertine and Carrara mineral plaster with subtle brass inlay joints, reflecting the Arabian Sea sunset.',
      image: '/assets/kochi_penthouse_marble.jpg'
    },
    {
      id: 'proj-5',
      title: 'Corporate Experience Atrium',
      category: 'cement',
      categoryLabel: 'Cement Texture Painting',
      location: 'Infopark Phase II, Kakkanad, Kochi',
      architect: 'Terraform Architects, Bangalore / Kochi',
      area: '850 sq.ft double-height lobby',
      finishSummary: 'Smoked charcoal mineral microcement with diamond-burnished reflection, harmonizing with an indoor tropical vertical garden.',
      image: '/assets/commercial_kochi_atrium.jpg'
    }
  ];

  filteredProjects = () => {
    const f = this.activeFilter();
    if (f === 'all') return this.projects;
    return this.projects.filter(p => p.category === f);
  };
}
