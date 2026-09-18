import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';
import { AudioService } from '../../services/audio.service';

export interface CollectionSwatch {
  letter: string;
  name: string;
  category: string;
  image: string;
  spec: string;
}

export interface KeralaLocation {
  name: string;
  region: string;
  type: string;
  coords: { x: number; y: number };
}

@Component({
  selector: 'app-kerala-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kerala-showcase.component.html',
  styleUrl: './kerala-showcase.component.css'
})
export class KeralaShowcaseComponent {
  readonly cartService = inject(SampleCartService);
  private readonly audioService = inject(AudioService);

  readonly swatches: CollectionSwatch[] = [
    {
      letter: 'A',
      name: 'Veined Italian Marble Slabs & Stucco',
      category: 'Marble Texture Painting',
      image: '/assets/carrara_wall.jpg',
      spec: '98.4% Apuan Alps Carrara dust & diamond specular polish'
    },
    {
      letter: 'B',
      name: 'Handcrafted Traditional Cement & Laterite',
      category: 'Cement Texture Painting',
      image: '/assets/cement_wall.jpg',
      spec: 'Monolithic tropical microcement with raw air-pocket voids'
    },
    {
      letter: 'C',
      name: 'Textured Quartz & Microcement Surfaces',
      category: 'Architectural Quartz',
      image: '/assets/line_brush_macro.jpg',
      spec: 'Continuous seamless kitchen counter and bathroom veneer'
    },
    {
      letter: 'D',
      name: 'Artisan Line Brush & Raked Stucco',
      category: 'Line Brush Painting',
      image: '/assets/line_brush_wall.jpg',
      spec: 'Vertical corduroy grooved plaster catching grazing Kerala light'
    }
  ];

  readonly keralaLocations: KeralaLocation[] = [
    { name: 'Kozhikode', region: 'Malabar Architectural Corridor', type: 'Design Salon & Studio', coords: { x: 38, y: 25 } },
    { name: 'Thrissur', region: 'Cultural Capital Residential Hub', type: 'Artisan Works & Site Ops', coords: { x: 48, y: 44 } },
    { name: 'Kochi (Ernakulam)', region: 'Panampilly Nagar & Marine Drive', type: 'Flagship Experience Center', coords: { x: 53, y: 56 } },
    { name: 'Alappuzha', region: 'Backwater Luxury Resorts & Villas', type: 'Major Project Region', coords: { x: 57, y: 67 } },
    { name: 'Kottayam', region: 'Highland Villas & Plantations', type: 'Artisanal Installations', coords: { x: 63, y: 72 } },
    { name: 'Thiruvananthapuram', region: 'Kowdiar Architectural Atelier', type: 'State Design Headquarters', coords: { x: 74, y: 88 } }
  ];

  readonly activeLocation = signal<KeralaLocation>(this.keralaLocations[2]);

  selectLocation(loc: KeralaLocation): void {
    this.activeLocation.set(loc);
    this.audioService.playChime(1.2);
  }

  scrollToSection(id: string): void {
    this.audioService.playTrowelSlide();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
