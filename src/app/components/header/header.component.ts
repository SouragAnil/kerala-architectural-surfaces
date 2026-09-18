import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { SampleCartService } from '../../services/sample-cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly audioService = inject(AudioService);
  readonly cartService = inject(SampleCartService);

  onSoundToggle(): void {
    this.audioService.toggleMute();
    if (!this.audioService.isMuted()) {
      this.audioService.playChime(1.2);
    }
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      this.audioService.playTrowelSlide();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
