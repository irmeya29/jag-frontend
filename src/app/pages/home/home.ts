import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnchorScrollDirective } from '../../shared/anchor-scroll.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AnchorScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
