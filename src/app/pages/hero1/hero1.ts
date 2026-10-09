import { Component, ChangeDetectionStrategy, signal, AfterViewInit, inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../shared/scroll-reveal/scroll-reveal.service';

import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero1',
  imports: [RouterLink, DragDropModule],
  templateUrl: './hero1.html',
  styleUrl: './hero1.scss',
})
export class Hero1 implements AfterViewInit {
  private scrollReveal = inject(ScrollRevealService);
  activeTab = signal<'pole1' | 'pole2'>('pole1');

  setTab(tab: 'pole1' | 'pole2') {
    this.activeTab.set(tab);
  }

  ngAfterViewInit() {
    // Timeout ensures DOM is fully rendered before observing
    setTimeout(() => {
      this.scrollReveal.observeAll();
    }, 50);
  }
}
