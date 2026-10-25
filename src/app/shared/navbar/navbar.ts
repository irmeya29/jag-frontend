import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);
  isMenuOpen = signal(false);
  isDropdownOpen = signal(false);
  activePole = signal<'pole1' | 'pole2'>('pole1');

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
  }

  navigateTo(path: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.closeMenu();
    this.router.navigateByUrl(path);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.set(false);
  }
}
