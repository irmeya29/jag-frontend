import { Component, signal , ChangeDetectionStrategy} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMenuOpen = signal(false);
  isDropdownOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.set(false);
  }
}
