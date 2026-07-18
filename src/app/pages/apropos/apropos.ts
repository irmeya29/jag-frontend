import { Component } from '@angular/core';
import { AnchorScrollDirective } from '../../shared/anchor-scroll.directive';

@Component({
  selector: 'app-apropos',
  imports: [AnchorScrollDirective],
  templateUrl: './apropos.html',
  styleUrl: './apropos.scss',
})
export class Apropos {}
