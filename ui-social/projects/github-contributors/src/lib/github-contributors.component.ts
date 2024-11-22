import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { GithubContributorsService, IOptions } from './github-contributors.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'github-contributors',
  standalone: true,
  imports: [GridComponent, CommonModule],
  template: `
  <div class="contribution-container" >
    <div class="grid-container"  [style.--grid-columns]="53" [style.--backGroundColor]="service.options().gridBackgroundColor">
    <span class="grid-item" *ngFor="let contribution of datesRange() | keyvalue">
      <Square [inputDate]="contribution.key" /> 
</span>
    </div> 
    <div class="flex-container">
      <span class="">{{service.options().footerTitle}}</span>
      <span class="" style="display: flex;gap:0.4em">Less <span class="flex-footer-grid " *ngFor="let git of lessMoreObject ">
      <span class="githubSquare"  [style.--backgroundColor]="git.contribution ? service.getGreenShadeDynamic(git.contribution) : service.options().gridColor">
   </span> </span> More</span> 
    </div>
  </div>
  `,
  styles: `
  
  .grid-container {
    overflow-x:"scroll";
  display: grid;
  box-shadow: none;
  padding:1px;
  transition: all 0.3s ease;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  background-color: var(--backGroundColor);
  gap: 0.3em;
  width: auto;  /* Width of the grid container */
  height: auto;
  grid-template-rows: repeat(7, auto); /* Fixed 7 rows */
}
.githubSquare {
    width: 0.625em;
    height: 0.625em;
    box-shadow: none;
    border-radius: 0.125em;
    background-color: var(--backgroundColor);
}
@media (max-width: 768px) {
  .grid-container {
    box-shadow: none;
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent wrapping of grid items */
    width: 100%; /* Make sure the container takes the full width */
  }
}
.grid-item {
  width: 0.625em;
  height: 0.625em;
  box-shadow: none;
}

.flex-container {
        display: flex;
        margin-top:0.5em;
        justify-content: space-between; /* Push items to the ends */
        align-items: center; /* Vertically align items */
        width: 100%; /* Full width */
    }
    .flex-footer-grid {
        display: flex;
        gap:1
        justify-content: end; /* Push items to the ends */
        align-items: center; /* Vertically align items */
    }
`
})
export class GithubContributorsComponent implements OnChanges {
  datesRange = signal<any>({});
  length: number = 0
  lessMoreObject = [
    { contribution: 0 }, { contribution: 30 }, { contribution: 80 }, { contribution: 100 }
  ]

  @Input() config: IOptions = {
    endDate: '',
    startDate: '',
    footerTitle: '',
    gridColor: '#ffffff',
    gridBackgroundColor: '#ffffff',
    gridHue: 120
  }

  @Input() data: any = {}
  constructor(public service: GithubContributorsService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.service.options.set(changes['config'].currentValue)
    this.service.data.set(changes['data'].currentValue)
    this.datesRange.set(this.service.getDatesInRange(this.service.options().startDate, this.service.options().endDate))
  }
}
