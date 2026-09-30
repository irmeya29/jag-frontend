import { Component , ChangeDetectionStrategy} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-realisations',
  imports: [],
  templateUrl: './realisations.html',
  styleUrl: './realisations.scss',
})
export class Realisations {}
