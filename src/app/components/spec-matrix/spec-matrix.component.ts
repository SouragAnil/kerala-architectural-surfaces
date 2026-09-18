import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { SampleCartService } from '../../services/sample-cart.service';

export interface SpecRow {
  code: string;
  discipline: string;
  formulation: string;
  binder: string;
  sheen: string;
  strength: string;
  monsoonProofing: string;
  coverage: string;
  approxRate: string;
}

@Component({
  selector: 'app-spec-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spec-matrix.component.html',
  styleUrl: './spec-matrix.component.css'
})
export class SpecMatrixComponent {
  private readonly audioService = inject(AudioService);
  readonly cartService = inject(SampleCartService);

  readonly rows: SpecRow[] = [
    {
      code: 'MM-01',
      discipline: 'Marble Texture',
      formulation: 'Carrara Pure Mist Venetian Stucco',
      binder: 'Aged Slaked Lime & Micro-Quartz',
      sheen: '88 - 94 GU (Mirror Polish)',
      strength: '28 MPa Hardened Calcification',
      monsoonProofing: 'Vapor-Permeable (&mu; < 12), Anti-Mildew',
      coverage: '1.6 - 2.2 m²/kg (3 coats)',
      approxRate: '₹280 - ₹380 / sq.ft'
    },
    {
      code: 'MM-02',
      discipline: 'Marble Texture',
      formulation: 'Nero Marquina 24K Aurum Stucco',
      binder: 'Volcanic Bituminous Mineral Lime',
      sheen: '92 GU Specular Lustre',
      strength: '30 MPa Compression Strength',
      monsoonProofing: 'Breathable Siloxane Vitrified Wax',
      coverage: '1.4 - 1.8 m²/kg',
      approxRate: '₹340 - ₹450 / sq.ft'
    },
    {
      code: 'CM-01',
      discipline: 'Cement Texture',
      formulation: 'Brutalist Architectural Concrete',
      binder: 'High-Alumina Micro-Mortar',
      sheen: '2 - 5 GU (Ultra-Matte)',
      strength: '42 MPa High Shear Resistance',
      monsoonProofing: '100% Hydrophobic Silane Cross-link',
      coverage: '0.9 - 1.4 m²/kg',
      approxRate: '₹220 - ₹310 / sq.ft'
    },
    {
      code: 'CM-02',
      discipline: 'Cement Texture',
      formulation: 'Loft Microcemento Monolith',
      binder: 'Hybrid Polymer Micro-Cement',
      sheen: '10 - 14 GU (Satin Nuvolato)',
      strength: '38 MPa Continuous Floor/Wall',
      monsoonProofing: 'Impermeable to Tropical Floodwater',
      coverage: '1.2 - 1.6 m²/kg',
      approxRate: '₹260 - ₹360 / sq.ft'
    },
    {
      code: 'LB-01',
      discipline: 'Line Brush',
      formulation: 'Zen Raked Plaster Corduroy',
      binder: 'Fibre-Reinforced Pozzolanic Lime',
      sheen: '3 GU Light-Scattering Matte',
      strength: '25 MPa Linear Ridge Toughness',
      monsoonProofing: 'Acoustic Rain Dampening (NRC 0.35)',
      coverage: '0.8 - 1.2 m²/kg (5 mm)',
      approxRate: '₹240 - ₹340 / sq.ft'
    },
    {
      code: 'LB-02',
      discipline: 'Line Brush',
      formulation: 'Imperial Gold Striae Line Comb',
      binder: 'Micro-Silicate with Fine Mica',
      sheen: '24 GU Directional Glint',
      strength: '26 MPa Flexible Mineral Bond',
      monsoonProofing: 'Anti-Fungal Tropical Formula',
      coverage: '1.3 - 1.7 m²/kg',
      approxRate: '₹290 - ₹390 / sq.ft'
    }
  ];

  downloadDossier(): void {
    this.audioService.playChime(1.5);
    alert('Architectural Specification Matrix Dossier downloaded. (PDF format)');
  }
}
