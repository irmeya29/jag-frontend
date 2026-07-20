import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pole1',
  imports: [RouterLink],
  templateUrl: './pole1.html',
  styleUrl: './pole1.scss',
})
export class Pole1 {
  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = id;
    }
  }
}
