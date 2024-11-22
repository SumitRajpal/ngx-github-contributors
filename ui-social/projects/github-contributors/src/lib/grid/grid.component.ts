import { Component, Input } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { GithubContributorsService } from '../github-contributors.service';

@Component({
  selector: 'Square',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',

})
export class GridComponent {
  @Input() inputDate?: any;
  constructor(public service: GithubContributorsService) { }
}
