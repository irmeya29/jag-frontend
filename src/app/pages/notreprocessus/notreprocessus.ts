import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notreprocessus',
  imports: [],
  templateUrl: './notreprocessus.html',
  styleUrl: './notreprocessus.scss',
})
export class Notreprocessus implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.getAttribute('data-delay');
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add('is-visible');
          this.observer.unobserve(el);
        }
      });
    }, options);

    const targets = this.el.nativeElement.querySelectorAll('[data-reveal]');
    targets.forEach((el: Element) => this.observer.observe(el));
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
