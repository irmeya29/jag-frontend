import { Component , ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-actualites',
  imports: [],
  templateUrl: './actualites.html',
  styleUrl: './actualites.scss',
})
export class Actualites {}
