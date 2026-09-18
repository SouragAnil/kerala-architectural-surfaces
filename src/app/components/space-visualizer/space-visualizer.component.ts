import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { SampleCartService } from '../../services/sample-cart.service';

export interface ArchitecturalSpace {
  id: string;
  name: string;
  location: string;
  architect: string;
  finishUsed: string;
  sqft: string;
  image: string;
  description: string;
  monsoonProofNote: string;
}

@Component({
  selector: 'app-space-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space-visualizer.component.html',
  styleUrl: './space-visualizer.component.css'
})
export class SpaceVisualizerComponent {
  private readonly audioService = inject(AudioService);
  readonly cartService = inject(SampleCartService);

  readonly spaces: ArchitecturalSpace[] = [
    {
      id: 'tropical-villa-aluva',
      name: 'Tropical Modern Villa, Aluva',
      location: 'Periyar Riverbank, Kochi, Kerala',
      architect: 'Ego Design Studio / Tropical Atelier',
      finishUsed: 'Microcemento Monolith & Raw Cement Texture',
      sqft: '4,200 sq.ft Wall & Floor Veneer',
      image: '/assets/kerala_tropical_villa.jpg',
      description: 'Monolithic seamless microcement spanning interior living pavilions and outdoor rain courtyards, harmonizing with natural teak and coconut palm landscapes.',
      monsoonProofNote: 'Engineered with hydrophobic silane sealants to prevent tropical algae growth during 120-day Southwest monsoon downpours.'
    },
    {
      id: 'marine-drive-penthouse',
      name: 'Marine Drive Waterfront Penthouse',
      location: 'Marine Drive, Kochi, Kerala',
      architect: 'Studio AC / Kochi Interior Architecture',
      finishUsed: 'Carrara Pure Mist Liquid Marble (Specular 92 GU)',
      sqft: '1,850 sq.ft Statement Walls',
      image: '/assets/kochi_penthouse_marble.jpg',
      description: 'A 24-foot double-height living room feature wall finished in seamless Italian Carrara liquid marble with warm backlighting, framing twilight views of the Vembanad backwaters.',
      monsoonProofNote: 'Zero VOC mineral base maintains clean indoor air quality even when seafront balconies are sealed against humid sea spray.'
    },
    {
      id: 'calicut-courtyard-home',
      name: 'Nalukettu Courtyard Residence',
      location: 'Mavoor Road Corridor, Kozhikode, Kerala',
      architect: 'Malabar Spatial Architecture',
      finishUsed: 'Zen Raked Line Brush Plaster Corduroy',
      sqft: '2,600 sq.ft Vertical Atrium Walls',
      image: '/assets/calicut_linebrush_courtyard.jpg',
      description: 'Artisanal vertical toothed comb line-brushed plaster framing an open-to-sky courtyard with terracotta jaali screens, creating dynamic moving linear shadows as the sun traverses overhead.',
      monsoonProofNote: 'High-porosity breathable lime mortar naturally regulates interior tropical humidity and dampens heavy monsoon rain acoustics.'
    }
  ];

  readonly activeSpace = signal<ArchitecturalSpace>(this.spaces[0]);
  readonly lightingMode = signal<'day' | 'evening'>('day');

  selectSpace(space: ArchitecturalSpace): void {
    this.activeSpace.set(space);
    this.audioService.playTrowelSlide();
  }

  toggleLighting(): void {
    const next = this.lightingMode() === 'day' ? 'evening' : 'day';
    this.lightingMode.set(next);
    this.audioService.playChime(next === 'evening' ? 0.9 : 1.3);
  }
}
