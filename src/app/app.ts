import { Component, AfterViewInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { HumanHeaderComponent } from './components/human-header/human-header.component';
import { HumanHeroComponent } from './components/human-hero/human-hero.component';
import { HumanDisciplinesComponent } from './components/human-disciplines/human-disciplines.component';
import { HumanBeforeAfterComponent } from './components/human-before-after/human-before-after.component';
import { HumanProjectsComponent } from './components/human-projects/human-projects.component';
import { HumanPricingComponent } from './components/human-pricing/human-pricing.component';
import { HumanFooterComponent } from './components/human-footer/human-footer.component';
import { SampleBoxModalComponent } from './components/sample-box-modal/sample-box-modal.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HumanHeaderComponent,
    HumanHeroComponent,
    HumanDisciplinesComponent,
    HumanBeforeAfterComponent,
    HumanProjectsComponent,
    HumanPricingComponent,
    HumanFooterComponent,
    SampleBoxModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private lenis: Lenis | null = null;
  private tickerCallback: ((time: number) => void) | null = null;

  ngAfterViewInit(): void {
    this.initSmoothScroll();
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
    }
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private initSmoothScroll(): void {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
      });

      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      this.tickerCallback = (time: number) => {
        this.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(this.tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });
  }
}
