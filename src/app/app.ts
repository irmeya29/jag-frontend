import { Component, inject, afterNextRender, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { ScrollRevealService } from './shared/scroll-reveal/scroll-reveal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly scrollReveal = inject(ScrollRevealService);

  isLoading = signal(true);
  isFadingOut = signal(false);
  loadingPercentage = signal(0);

  constructor() {
    // Initialise après le premier rendu du DOM
    afterNextRender(() => {
      this.scrollReveal.init();

      let percent = 0;
      const interval = setInterval(() => {
        percent += 2;
        if (percent > 100) percent = 100;
        this.loadingPercentage.set(percent);
        
        if (percent === 100) {
          clearInterval(interval);
        }
      }, 50); // Reaches 100 in 2500ms

      setTimeout(() => {
        this.isFadingOut.set(true);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1200);
      }, 2800);
    });
  }
}
