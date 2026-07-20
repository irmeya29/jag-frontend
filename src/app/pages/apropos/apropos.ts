import { Component } from '@angular/core';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.html',
  styleUrl: './apropos.scss',
})
export class Apropos {
  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = id;
    }
  }
}
