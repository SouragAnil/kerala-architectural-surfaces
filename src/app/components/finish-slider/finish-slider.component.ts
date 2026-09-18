import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

export interface ComparisonPair {
  discipline: 'marble' | 'cement' | 'line-brush';
  tabTitle: string;
  toolName: string;
  leftTitle: string;
  leftSub: string;
  leftImage: string;
  rightTitle: string;
  rightSub: string;
  rightImage: string;
  leftSpecs: { title: string; items: string[] };
  rightSpecs: { title: string; items: string[] };
}

@Component({
  selector: 'app-finish-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish-slider.component.html',
  styleUrl: './finish-slider.component.css'
})
export class FinishSliderComponent {
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;

  private readonly audioService = inject(AudioService);

  readonly pairs: ComparisonPair[] = [
    {
      discipline: 'marble',
      tabTitle: '1. Marble Texture Painting',
      toolName: 'VENETIAN SPATULA',
      leftTitle: 'RAW HONED VEIN STUCCO',
      leftSub: 'Diffused Soft Calcite Grain (8 GU)',
      leftImage: '/assets/artisan_trowel.jpg',
      rightTitle: 'DIAMOND MIRROR MARBLE',
      rightSub: 'High-Gloss Specular Polish (92 GU)',
      rightImage: '/assets/carrara_wall.jpg',
      leftSpecs: {
        title: 'Honed Marble Plaster',
        items: [
          'Sheen: 6 - 9 GU (Ultra Diffused)',
          'Hand-Feel: Warm Sanded Limestone',
          'Application: Dual-Pass Steel Trowel',
          'Best For: Dining Salons, Living Galleries'
        ]
      },
      rightSpecs: {
        title: 'Diamond Mirror Sheen',
        items: [
          'Sheen: 88 - 94 GU (Specular True Stone)',
          'Hand-Feel: Seamless Glazed Glass Topography',
          'Application: Mechanical Burnish + Carnauba Buff',
          'Best For: Foyers, Powder Rooms, Statement Ceilings'
        ]
      }
    },
    {
      discipline: 'cement',
      tabTitle: '2. Cement Texture Painting',
      toolName: 'CONCRETE HAWK & FLOAT',
      leftTitle: 'PITTED CAST CONCRETE',
      leftSub: 'Porous Industrial Formwork Patina (3 GU)',
      leftImage: '/assets/cement_wall.jpg',
      rightTitle: 'SMOOTH MICROCEMENTO',
      rightSub: 'Monolithic Seamless Clouding (12 GU)',
      rightImage: '/assets/artisan_trowel.jpg',
      leftSpecs: {
        title: 'Architectural Brutalist Cement',
        items: [
          'Texture: Organic Shutter Board Air Pits',
          'Strength: 42 MPa High Shear Resistance',
          'Application: Sponge-Stippled + Magnesium Float',
          'Best For: Industrial Lofts, Fireplace Surrounds'
        ]
      },
      rightSpecs: {
        title: 'Nuvolato Microcemento Veneer',
        items: [
          'Texture: Velvety Clouded Tonal Waves',
          'Thickness: 2.0 mm Continuous Wall-to-Floor',
          'Application: Flexible Polyurethane Blade',
          'Best For: Open-Plan Atriums, Minimalist Kitchens'
        ]
      }
    },
    {
      discipline: 'line-brush',
      tabTitle: '3. Line Brush Painting',
      toolName: 'STEEL RAKE COMB',
      leftTitle: 'RAKED CORDUROY GROOVES',
      leftSub: 'Rhythmic Parallel Linear Striations (2 GU)',
      leftImage: '/assets/line_brush_macro.jpg',
      rightTitle: 'ARCHITECTURAL ZEN SANCTUARY',
      rightSub: 'Grazing Light Corduroy Plaster Wall',
      rightImage: '/assets/line_brush_wall.jpg',
      leftSpecs: {
        title: 'Raked Toothed Comb Plaster',
        items: [
          'Profile: 3.5 mm High Relief Vertical Ridges',
          'Acoustics: NRC 0.35 Sound-Scattering Ridge',
          'Application: Wide Steel Toothed Combing Comb',
          'Best For: Master Headboard Walls, Acoustic Theatres'
        ]
      },
      rightSpecs: {
        title: 'Directional Line Brushed Striae',
        items: [
          'Profile: Micro-Fine Silk Hairlines with Gold Mica',
          'Luminescence: Highlights with Grazing Side Sconces',
          'Application: Natural Hog Bristle Dry-Dragging',
          'Best For: Hallways, Hotel Corridors, Private Spas'
        ]
      }
    }
  ];

  readonly activePairIndex = signal<number>(0);
  readonly splitPercent = signal<number>(50);
  readonly isDragging = signal<boolean>(false);

  selectDiscipline(idx: number): void {
    this.activePairIndex.set(idx);
    this.splitPercent.set(50);
    this.audioService.playChime(1.1 + idx * 0.15);
  }

  onMouseDown(e: MouseEvent): void {
    this.isDragging.set(true);
    this.audioService.playTrowelSlide();
    this.updatePositionFromEvent(e.clientX);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isDragging()) return;
    this.updatePositionFromEvent(e.clientX);
  };

  private onMouseUp = () => {
    this.isDragging.set(false);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  onTouchStart(e: TouchEvent): void {
    this.isDragging.set(true);
    this.audioService.playTrowelSlide();
    this.updatePositionFromEvent(e.touches[0].clientX);
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.isDragging()) return;
    this.updatePositionFromEvent(e.touches[0].clientX);
  }

  onTouchEnd(): void {
    this.isDragging.set(false);
  }

  private updatePositionFromEvent(clientX: number): void {
    if (!this.containerRef) return;
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    this.splitPercent.set(pct);
  }

  onRangeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.splitPercent.set(Number(input.value));
  }
}
