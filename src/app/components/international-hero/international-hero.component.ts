import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCartService } from '../../services/sample-cart.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-international-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './international-hero.component.html',
  styleUrl: './international-hero.component.css'
})
export class InternationalHeroComponent {
  readonly cartService = inject(SampleCartService);
  private readonly audioService = inject(AudioService);

  scrollToChapter(id: string): void {
    this.audioService.playTrowelSlide();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
