import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * ScrollRevealService
 * -------------------
 * Observe automatiquement tous les éléments [data-reveal] et .fade-in-up
 * sur la page courante via IntersectionObserver.
 *
 * Attributs supportés sur les éléments :
 *  - data-reveal            → active l'animation sur cet élément
 *  - data-delay="200"       → délai en ms avant l'animation (défaut: 0)
 *  - data-stagger           → stagger automatique sur les enfants directs
 *  - data-stagger-delay="80"→ intervalle entre enfants en ms (défaut: 80)
 *  - data-direction="left"  → arrive depuis la gauche (défaut: bottom)
 *  - data-direction="right" → arrive depuis la droite
 */
@Injectable({ providedIn: 'root' })
export class ScrollRevealService implements OnDestroy {
  private observer: IntersectionObserver | null = null;
  private sub!: Subscription;

  constructor(private router: Router) {}

  /** À appeler une seule fois depuis AppComponent.ngAfterViewInit */
  init(): void {
    this.setupObserver();

    // Ré-observe après chaque navigation (nouvelle page)
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.observeAll(), 120);
      });
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset['delay'] || '0', 10);

            setTimeout(() => {
              el.classList.add('is-revealed');

              // Stagger sur les enfants si demandé
              if (el.hasAttribute('data-stagger')) {
                const staggerDelay = parseInt(
                  el.dataset['staggerDelay'] || '80',
                  10
                );
                Array.from(el.children).forEach((child, i) => {
                  (child as HTMLElement).style.transitionDelay = `${i * staggerDelay}ms`;
                  (child as HTMLElement).classList.add('is-revealed');
                });
              }
            }, delay);

            // N'observe qu'une fois
            this.observer?.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,       // déclenche quand 12% de l'élément est visible
        rootMargin: '0px 0px -40px 0px', // légèrement avant d'arriver au bord
      }
    );

    this.observeAll();
  }

  observeAll(): void {
    if (!this.observer) return;

    // Sélectionne tous les éléments à animer
    const selector = '[data-reveal], .fade-in-up, .fade-up';
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      // Évite de ré-observer ce qui est déjà révélé
      if (!el.classList.contains('is-revealed')) {
        // Ajoute la classe de base pour l'état initial
        el.classList.add('reveal-init');

        // Direction
        const dir = el.dataset['direction'] || 'bottom';
        el.classList.add(`reveal-from-${dir}`);

        this.observer!.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sub?.unsubscribe();
  }
}
