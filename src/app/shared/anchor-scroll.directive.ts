import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'a[href^="#"]:not([href="#"])',
  standalone: true,
})
export class AnchorScrollDirective {
  constructor(private readonly el: ElementRef<HTMLAnchorElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const href = this.el.nativeElement.getAttribute('href');
    if (!href?.startsWith('#') || href === '#') {
      return;
    }

    const id = decodeURIComponent(href.slice(1));
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
