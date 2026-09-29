import { Component, inject, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { ScrollRevealService } from './shared/scroll-reveal/scroll-reveal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly scrollReveal = inject(ScrollRevealService);

  constructor() {
    // Initialise après le premier rendu du DOM
    afterNextRender(() => {
      this.scrollReveal.init();
    });
  }
}
