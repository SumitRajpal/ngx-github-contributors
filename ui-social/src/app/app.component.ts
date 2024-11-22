import { Component } from '@angular/core';
import { GithubContributorsComponent } from 'github-contributors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GithubContributorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ui-social';

  config = {
    endDate: '2024-12-19',
    startDate: '2023-12-19',
    footerTitle: 'Learn how we count contributions',
    gridColor: '#161B20',
    gridBackgroundColor: '#0D1117',
    tooltipBackgroundColor: '#161b22',
    tooltipTextColor: '#ffffff',
    gridHue: 120
  }
  data = this.getDatesInRange('2023-12-19', '2024-12-19')
  getDatesInRange(startDate: string, endDate: string) {
    // Convert start and end dates to Date objects
    let start = new Date(startDate);
    const end = new Date(endDate);

    // Validate input dates
    if (start > end) {
      console.error("Start date must be earlier than or equal to the end date.");
      return {};
    }

    // if (start.getDay() !== 0) {
    //   console.log("Start date is not a Sunday. Adjusting to the previous Sunday.");
    //   // Adjust to the previous Sunday if not Sunday
    //   start.setDate(start.getDate() - start.getDay());
    // }

    // Initialize an object to hold dates with contributions
    const result: any = {};

    // Loop through all the days in the range
    let currentDate = new Date(start);

    while (currentDate <= end) {
      // Format the date as "YYYY-MM-DD"
      const formattedDate = currentDate.toISOString().split('T')[0];

      // Add the date with contribution entry to the object
      result[formattedDate] = { count: Math.floor(Math.random() * 256), tooltipText: `NO contribution on july${Math.floor(Math.random() * 256)}` };

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }
}
