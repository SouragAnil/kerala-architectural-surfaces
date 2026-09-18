import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

export interface PaintLayer {
  index: string;
  name: string;
  depth: string;
  scientificRole: string;
  composition: string;
  keyFeature: string;
  gradientBg: string;
  borderTone: string;
}

@Component({
  selector: 'app-layer-dissection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layer-dissection.component.html',
  styleUrl: './layer-dissection.component.css'
})
export class LayerDissectionComponent {
  private readonly audioService = inject(AudioService);

  readonly layers: PaintLayer[] = [
    {
      index: '01',
      name: 'Petrifying Silicate Primer',
      depth: '0.15 mm',
      scientificRole: 'Substrate Molecular Calcification',
      composition: 'Colloidal Potassium Silicate + Micro-Fine Quartz Sand',
      keyFeature: 'Fuses chemically with porous drywall, converting gypsum into a unified mineral matrix that will never peel or bubble.',
      gradientBg: 'linear-gradient(135deg, rgba(60, 68, 77, 0.4) 0%, rgba(20, 24, 30, 0.7) 100%)',
      borderTone: '#6b7a8a'
    },
    {
      index: '02',
      name: 'Apuan Carrara Quartz Ground',
      depth: '0.80 mm',
      scientificRole: 'Structural Mass & Thermal Density',
      composition: '98.4% Pure Tuscan Calcium Carbonate + Aged Slaked Lime Slurry',
      keyFeature: 'Provides substantial physical stone mass, absorbing ambient moisture and dampening acoustic reverberation in spacious luxury rooms.',
      gradientBg: 'linear-gradient(135deg, rgba(160, 155, 145, 0.3) 0%, rgba(40, 38, 35, 0.7) 100%)',
      borderTone: '#c5c2bb'
    },
    {
      index: '03',
      name: 'Liquid Gold & Mica Vein Suspension',
      depth: '0.35 mm',
      scientificRole: 'Directional Light Refraction & Optical Depth',
      composition: 'Natural Flake Mica, 24K Gold Leaf Suspension, Organic Copper Oxides',
      keyFeature: 'Hand-swirled across the ground with feathering trowels; crystalline flecks catch grazing light at varying angles as you walk past.',
      gradientBg: 'linear-gradient(135deg, rgba(201, 168, 106, 0.35) 0%, rgba(38, 30, 15, 0.7) 100%)',
      borderTone: '#e2c082'
    },
    {
      index: '04',
      name: 'Diamond Lustre Carnauba Crystal Seal',
      depth: '0.08 mm',
      scientificRole: 'Vapour-Permeable Protective Vitrification',
      composition: 'Brazilian Organic Carnauba Wax, Liquid Marseille Olive Soap, Siloxane Shield',
      keyFeature: 'Buffed mechanically to mirror gloss. Fully hydrophobic and wipe-clean while permitting internal plaster carbonation to breathe indefinitely.',
      gradientBg: 'linear-gradient(135deg, rgba(100, 200, 160, 0.25) 0%, rgba(15, 35, 28, 0.7) 100%)',
      borderTone: '#52b788'
    }
  ];

  readonly activeLayerIndex = signal<number>(2);

  selectLayer(index: number): void {
    this.activeLayerIndex.set(index);
    this.audioService.playChime(1.0 + index * 0.15);
  }
}
