import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private readonly audioService = inject(AudioService);

  emailInput = '';
  readonly subscribed = signal<boolean>(false);

  onSubscribe(): void {
    if (this.emailInput.includes('@')) {
      this.subscribed.set(true);
      this.audioService.playChime(1.3);
      this.emailInput = '';
    }
  }

  scrollToTop(): void {
    this.audioService.playTrowelSlide();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
