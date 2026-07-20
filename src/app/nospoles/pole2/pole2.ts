import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pole2',
  imports: [RouterLink],
  templateUrl: './pole2.html',
  styleUrl: './pole2.scss'
})
export class Pole2 implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private snapTimer: ReturnType<typeof setTimeout> | null = null;

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = id;
    }
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
    this.initScrollReveal();
    this.snapTimer = setTimeout(() => {
      document.documentElement.classList.add('snap-scroll-enabled');
    }, 50);
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
    if (this.snapTimer) {
      clearTimeout(this.snapTimer);
    }
    document.documentElement.classList.remove('snap-scroll-enabled');
    if (this.observer) this.observer.disconnect();
  }
}

