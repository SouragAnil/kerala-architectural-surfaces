import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';
import { AudioService } from '../../services/audio.service';

export interface DisciplineChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  primaryImage: string;
  macroImage: string;
  quote: string;
  composition: string;
  sheenRating: string;
  thickness: string;
  tropicalResilience: string;
  sampleItemIndex: number;
}

@Component({
  selector: 'app-discipline-triptych',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discipline-triptych.component.html',
  styleUrl: './discipline-triptych.component.css'
})
export class DisciplineTriptychComponent {
  readonly cartService = inject(SampleCartService);
  private readonly audioService = inject(AudioService);

  readonly chapters: DisciplineChapter[] = [
    {
      id: 'chapter-marble',
      number: '01',
      title: 'LIQUID MARBLE & VENETIAN STUCCO',
      subtitle: 'Pittura a Effetto Marmo / Calcite & 24K Gold Veins',
      primaryImage: '/assets/kochi_penthouse_marble.jpg',
      macroImage: '/assets/carrara_wall.jpg',
      quote: 'Stone freed from the quarry. 98.4% genuine Carrara calcium carbonate calcifies chemically into solid stone upon the wall.',
      composition: 'Colloidal slaked lime slurry, micronized Carrara quartz, natural flake mica suspension',
      sheenRating: '88 - 94 GU (Specular True Stone) / 8 GU (Velvet Honed)',
      thickness: '1.2 - 2.0 mm structural mineral veneer',
      tropicalResilience: 'Inherent vapor permeability prevents tropical blistering and moisture entrapment.',
      sampleItemIndex: 0
    },
    {
      id: 'chapter-cement',
      number: '02',
      title: 'ARCHITECTURAL MICROCEMENT & RAW CONCRETE',
      subtitle: 'Microcemento Architettonico / Monolithic Concrete Veneer',
      primaryImage: '/assets/kerala_tropical_villa.jpg',
      macroImage: '/assets/cement_wall.jpg',
      quote: 'Unbroken monolithic planes. Seamless transitions across floors, walls, and wet courtyards with authentic formwork pitting.',
      composition: 'High-alumina hydraulic micro-mortar with hydrophobic silane cross-linking',
      sheenRating: '2 - 5 GU (Raw Architectural Matte) / 12 GU (Satin Nuvolato)',
      thickness: '2.0 - 3.5 mm continuous high-shear coating (42 MPa)',
      tropicalResilience: '100% waterproof and anti-fungal barrier engineered for 120-day Kerala monsoon downpours.',
      sampleItemIndex: 3
    },
    {
      id: 'chapter-line',
      number: '03',
      title: 'RAKED LINE BRUSH & VERTICAL CORDUROY',
      subtitle: 'Spazzolato & Pettinato / Combed Linear Mineral Plaster',
      primaryImage: '/assets/calicut_linebrush_courtyard.jpg',
      macroImage: '/assets/line_brush_macro.jpg',
      quote: 'Rhythmic shadowplay in architectural space. 3.5 mm vertical combed striations designed to sculpt directional raking sunlight.',
      composition: 'Fibre-reinforced pozzolanic hydraulic lime, fine silica quartz sand, vegetal binders',
      sheenRating: '3 GU (Tactile Light-Diffusing Matte)',
      thickness: '3.0 - 5.0 mm three-dimensional relief',
      tropicalResilience: 'High sound-scattering acoustic absorption (NRC 0.35) dampening torrential monsoon rain noise.',
      sampleItemIndex: 5
    }
  ];

  addSampleToBox(chapter: DisciplineChapter): void {
    const item = this.cartService.finishes[chapter.sampleItemIndex];
    if (item) {
      const added = this.cartService.toggleSample(item);
      if (added) {
        this.audioService.playChime(1.4);
      } else {
        this.audioService.playTrowelSlide();
      }
    }
  }

  isInBox(chapter: DisciplineChapter): boolean {
    const item = this.cartService.finishes[chapter.sampleItemIndex];
    return item ? this.cartService.isInCart(item.id) : false;
  }
}
