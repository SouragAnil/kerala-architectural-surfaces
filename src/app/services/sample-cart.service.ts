import { Injectable, computed, signal } from '@angular/core';

export type TechniqueDiscipline = 'marble' | 'cement' | 'line-brush';

export interface MarbleFinish {
  id: string;
  discipline: TechniqueDiscipline;
  disciplineLabel: string;
  name: string;
  subtitle: string;
  origin: string;
  primaryTone: string;
  veinAccent: string;
  finishOptions: string[];
  carraraDustPercent: number;
  vocRating: string;
  thicknessMm: string;
  image: string;
  description: string;
  specDetails: {
    baseResin: string;
    sheenRating: string;
    dryingTime: string;
    coveragePerKg: string;
    applicationTool: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SampleCartService {
  readonly maxSamples = 3;

  readonly finishes: MarbleFinish[] = [
    // 1. MARBLE TEXTURE PAINTING
    {
      id: 'carrara-mist',
      discipline: 'marble',
      disciplineLabel: 'Marble Texture Painting',
      name: 'Carrara Pure Mist',
      subtitle: 'Apuan Alps Liquid Marble with Calcite Feathering',
      origin: 'Carrara, Tuscany, Italy',
      primaryTone: '#F3F2EE',
      veinAccent: '#7D868F',
      finishOptions: ['Diamond Polished', 'Honed Velvet', 'Raw Venetian Stucco'],
      carraraDustPercent: 98.4,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '1.2 - 2.0 mm',
      image: '/assets/carrara_wall.jpg',
      description: 'Hand-milled calcium carbonate plaster capturing the iconic soft feathering of Renaissance sculpture quarries.',
      specDetails: {
        baseResin: 'Mineral Potassium Silicate',
        sheenRating: '85 GU (Mirror) / 8 GU (Honed)',
        dryingTime: '4 hrs per coat (3 coats recommended)',
        coveragePerKg: '1.6 - 2.2 m²/kg',
        applicationTool: 'Venetian Stainless Steel Spatula'
      }
    },
    {
      id: 'nero-marquina',
      discipline: 'marble',
      disciplineLabel: 'Marble Texture Painting',
      name: 'Nero Marquina Aurum',
      subtitle: 'Basalt Carbon with 24K Gold Leaf Micro-Veins',
      origin: 'Markina-Xemein, Basque Country',
      primaryTone: '#121417',
      veinAccent: '#E0BA6C',
      finishOptions: ['Diamond Polished', 'Liquid Gold Leaf', 'Honed Satin'],
      carraraDustPercent: 96.8,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '1.5 - 2.5 mm',
      image: '/assets/nero_marquina_wall.jpg',
      description: 'Volcanic bituminous carbon plaster infused with genuine crushed mica and metallic gold leaf particles.',
      specDetails: {
        baseResin: 'Aged Slaked Slurry & Micro-Ceramic',
        sheenRating: '92 GU (Specular Polish)',
        dryingTime: '6 hrs between trowel coats',
        coveragePerKg: '1.4 - 1.8 m²/kg',
        applicationTool: 'Japanese Mirror Burnisher'
      }
    },
    {
      id: 'emerald-malachite',
      discipline: 'marble',
      disciplineLabel: 'Marble Texture Painting',
      name: 'Emerald Malachite Onyx',
      subtitle: 'Botanical Crystalline Layered Jade',
      origin: 'Ural Crystalline Formations',
      primaryTone: '#0E2820',
      veinAccent: '#48B289',
      finishOptions: ['Diamond Polished', 'Raw Venetian Stucco', 'Honed Satin'],
      carraraDustPercent: 95.5,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '1.4 - 2.2 mm',
      image: '/assets/emerald_onyx_interior.jpg',
      description: 'Hypnotic concentric banding created through wet-on-wet mineral troweling with pulverized copper carbonate pigments.',
      specDetails: {
        baseResin: 'Organic Polymer & Calcified Lime',
        sheenRating: '88 GU (Deep Lustre)',
        dryingTime: '5 hrs per coat',
        coveragePerKg: '1.5 - 2.0 m²/kg',
        applicationTool: 'Curved Venetian Trowel'
      }
    },

    // 2. CEMENT TEXTURE PAINTING
    {
      id: 'brutalist-concrete',
      discipline: 'cement',
      disciplineLabel: 'Cement Texture Painting',
      name: 'Brutalist Architectural Concrete',
      subtitle: 'Porous Raw Cast Cement with Mineral Pitting Patina',
      origin: 'Bologna Mineral Lab, Italy',
      primaryTone: '#949594',
      veinAccent: '#5C5E60',
      finishOptions: ['Pitted Shutter Cast', 'Smooth Float Stucco', 'Smoked Basalt Patina'],
      carraraDustPercent: 91.2,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '2.5 - 4.0 mm',
      image: '/assets/cement_wall.jpg',
      description: 'Heavy mineral microcement engineered to replicate formwork board marks, air pocket pittings, and monolithic industrial cast concrete.',
      specDetails: {
        baseResin: 'High-Alumina Hydraulic Micro-Cement',
        sheenRating: '2 - 5 GU (Dead Flat Matte)',
        dryingTime: '6 hrs per coat',
        coveragePerKg: '0.9 - 1.4 m²/kg',
        applicationTool: 'Magnesium Concrete Float & Sponge'
      }
    },
    {
      id: 'microcemento-monolith',
      discipline: 'cement',
      disciplineLabel: 'Cement Texture Painting',
      name: 'Loft Microcemento Nuvolato',
      subtitle: 'Clouded Continuous Architectural Cement Veneer',
      origin: 'Lombardy, Italy',
      primaryTone: '#A8A69F',
      veinAccent: '#7C7973',
      finishOptions: ['Clouded Burnished', 'Ultra-Matte Industrial', 'Sealed Satin'],
      carraraDustPercent: 93.0,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '2.0 - 3.0 mm',
      image: '/assets/artisan_trowel.jpg',
      description: 'Seamless troweled microcement designed for continuous wall-to-floor transitions with soft organic tonal variations.',
      specDetails: {
        baseResin: 'Hybrid Epoxy-Silica Cement',
        sheenRating: '10 GU (Satin Concrete)',
        dryingTime: '4 hrs recoat',
        coveragePerKg: '1.2 - 1.6 m²/kg',
        applicationTool: 'Flexible Polyurethane Trowel'
      }
    },

    // 3. LINE BRUSH PAINTING
    {
      id: 'raked-corduroy',
      discipline: 'line-brush',
      disciplineLabel: 'Line Brush Painting',
      name: 'Zen Raked Plaster Corduroy',
      subtitle: 'Vertical Toothed Line Brush Striations',
      origin: 'Kyoto Artisanal Inspiration',
      primaryTone: '#DCD6CA',
      veinAccent: '#B1A696',
      finishOptions: ['Fine Vertical Line Brush', 'Broad Comb Rake', 'Cross-Hatch Linen'],
      carraraDustPercent: 96.0,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '3.0 - 5.0 mm',
      image: '/assets/line_brush_wall.jpg',
      description: 'High-relief mineral plaster combed with custom steel toothed rake brushes to create three-dimensional linear shadowplay.',
      specDetails: {
        baseResin: 'Fibre-Reinforced Pozzolanic Lime',
        sheenRating: '3 GU (Tactile Matte)',
        dryingTime: '8 hrs setting time',
        coveragePerKg: '0.8 - 1.2 m²/kg',
        applicationTool: 'Artisanal Steel Tooth Line Comb'
      }
    },
    {
      id: 'aurum-line-brush',
      discipline: 'line-brush',
      disciplineLabel: 'Line Brush Painting',
      name: 'Imperial Striae Gold Rake',
      subtitle: 'Directional Bristle Line Brush with Metallic Sheen',
      origin: 'Milan Atelier Special',
      primaryTone: '#CFC3AB',
      veinAccent: '#E2C082',
      finishOptions: ['Gilded Linear Brush', 'Silk Grasscloth Striae', 'Woven Cord'],
      carraraDustPercent: 94.5,
      vocRating: '0.0 g/L (Ultra-Pure)',
      thicknessMm: '2.0 - 3.2 mm',
      image: '/assets/line_brush_macro.jpg',
      description: 'Layered horizontal or vertical brushwork pulling genuine crushed mica lines across lime paste, catching ambient raking light.',
      specDetails: {
        baseResin: 'Micro-Silicate with Fine Mica',
        sheenRating: '24 GU (Shimmering Striation)',
        dryingTime: '5 hrs curing',
        coveragePerKg: '1.3 - 1.7 m²/kg',
        applicationTool: 'Natural Hog Bristle Line Brush'
      }
    }
  ];

  readonly selectedSamples = signal<MarbleFinish[]>([this.finishes[0], this.finishes[3], this.finishes[5]]);
  readonly isCartOpen = signal<boolean>(false);
  readonly isSampleOrdered = signal<boolean>(false);

  // Aliases for intuitive API usage across components
  readonly isModalOpen = this.isCartOpen;
  readonly itemCount = computed(() => this.selectedSamples().length);
  readonly selectedCount = computed(() => this.selectedSamples().length);
  readonly canAddMore = computed(() => this.selectedSamples().length < this.maxSamples);

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  toggleFinish(finish: MarbleFinish): boolean {
    return this.toggleSample(finish);
  }

  toggleSample(finish: MarbleFinish): boolean {
    const current = this.selectedSamples();
    const index = current.findIndex(s => s.id === finish.id);

    if (index >= 0) {
      this.selectedSamples.set(current.filter(s => s.id !== finish.id));
      return false;
    } else {
      if (current.length < this.maxSamples) {
        this.selectedSamples.set([...current, finish]);
        return true;
      }
      return false;
    }
  }

  isInCart(id: string): boolean {
    return this.selectedSamples().some(s => s.id === id);
  }
}
