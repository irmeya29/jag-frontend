import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnchorScrollDirective } from '../../shared/anchor-scroll.directive';

@Component({
  selector: 'app-pole1',
  imports: [RouterLink, AnchorScrollDirective],
  templateUrl: './pole1.html',
  styleUrl: './pole1.scss',
})
export class Pole1 {}
