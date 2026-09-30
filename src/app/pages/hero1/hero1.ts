import { Component , ChangeDetectionStrategy} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero1',
  imports: [RouterLink],
  templateUrl: './hero1.html',
  styleUrl: './hero1.scss',
})
export class Hero1 {}
