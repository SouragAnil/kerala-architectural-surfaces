import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleFinish, SampleCartService, TechniqueDiscipline } from '../../services/sample-cart.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-collection-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-grid.component.html',
  styleUrl: './collection-grid.component.css'
})
export class CollectionGridComponent {
  readonly cartService = inject(SampleCartService);
  private readonly audioService = inject(AudioService);

  readonly activeFilter = signal<'all' | TechniqueDiscipline>('all');

  readonly filteredFinishes = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.cartService.finishes;
    }
    return this.cartService.finishes.filter(f => f.discipline === filter);
  });

  readonly selectedFinishPerCard = signal<{ [key: string]: string }>({
    'carrara-mist': 'Diamond Polished',
    'nero-marquina': 'Liquid Gold Leaf',
    'emerald-malachite': 'Diamond Polished',
    'brutalist-concrete': 'Pitted Shutter Cast',
    'microcemento-monolith': 'Clouded Burnished',
    'raked-corduroy': 'Fine Vertical Line Brush',
    'aurum-line-brush': 'Gilded Linear Brush'
  });

  readonly activeSpecFinish = signal<MarbleFinish | null>(null);

  setFilter(filter: 'all' | TechniqueDiscipline): void {
    this.activeFilter.set(filter);
    this.audioService.playChime(1.15);
  }

  setFinishVariant(finishId: string, variant: string): void {
    this.selectedFinishPerCard.update(current => ({
      ...current,
      [finishId]: variant
    }));
    this.audioService.playChime(1.1);
  }

  toggleSample(finish: MarbleFinish): void {
    const wasAdded = this.cartService.toggleSample(finish);
    if (wasAdded) {
      this.audioService.playChime(1.4);
    } else {
      this.audioService.playTrowelSlide();
    }
  }

  viewSpecs(finish: MarbleFinish): void {
    this.activeSpecFinish.set(finish);
    this.audioService.playChime(0.95);
  }

  closeSpecs(): void {
    this.activeSpecFinish.set(null);
  }

  onMouseMoveCard(e: MouseEvent, cardElement: HTMLElement): void {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  onMouseLeaveCard(cardElement: HTMLElement): void {
    cardElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  }
}
