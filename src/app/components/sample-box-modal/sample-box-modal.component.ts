import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SampleCartService, MarbleFinish } from '../../services/sample-cart.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-sample-box-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sample-box-modal.component.html',
  styleUrl: './sample-box-modal.component.css'
})
export class SampleBoxModalComponent {
  readonly cartService = inject(SampleCartService);
  private readonly audioService = inject(AudioService);

  readonly isTradeAccount = signal<boolean>(true);
  readonly orderSuccess = signal<boolean>(false);
  readonly orderReference = signal<string>('MK-8420-KOCHI');

  formData = {
    name: 'Ar. Rahul Menon',
    studio: 'Menon & Associates Tropical Architecture',
    email: 'rahul@menonarchitects.in',
    phone: '+91 98471 23456',
    address: 'Suite 4B, Panampilly Nagar Main Road, Kochi, Kerala 682036',
    projectType: 'Tropical Courtyard Villa, Aluva (4,800 sq.ft)',
    city: 'Kochi'
  };

  removeTile(finish: MarbleFinish): void {
    this.cartService.toggleSample(finish);
    this.audioService.playTrowelSlide();
  }

  setAccountType(isTrade: boolean): void {
    this.isTradeAccount.set(isTrade);
    this.audioService.playChime(1.1);
  }

  submitOrder(): void {
    if (this.cartService.selectedCount() === 0) return;
    this.audioService.playChime(1.5);
    this.orderReference.set('MK-' + Math.floor(1000 + Math.random() * 9000) + '-KL');
    this.orderSuccess.set(true);
  }

  close(): void {
    this.orderSuccess.set(false);
    this.cartService.closeCart();
  }
}
