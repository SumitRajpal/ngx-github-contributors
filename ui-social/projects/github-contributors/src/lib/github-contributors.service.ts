import { Injectable, Input, signal } from '@angular/core';
export interface IOptions {
  startDate: string
  endDate: string,
  footerTitle?: string,
  gridColor?: string | null
  gridBackgroundColor?: string | null
  tooltipTextColor?: string
  tooltipBackgroundColor?: string
  gridHue?: number
}
@Injectable({
  providedIn: 'root'
})
export class GithubContributorsService {
  /**
   * @endDate enter the end date in YYYY-MM-DD
   * @startDate enter the start date in YYYY-MM-DD
   * @footerTitle enter the footer title in string format
   * @gridColor sets the color when there no count value enter in string format
   * @gridHue enter hue in number format between 0 - 255
   * @gridBackgroundColor set the main container color of grid
   * @tooltipBackgroundColor set the background color for tooltip
   * @tooltipTextColor set the test color for tooltip
   */
  options = signal<IOptions>({
    endDate: '',
    startDate: '',
    footerTitle: '',
    gridColor: '#161b22',
    gridBackgroundColor: '#161b22',
    tooltipBackgroundColor: '#161b22',
    tooltipTextColor: '#ffffff',
    gridHue: 120
  });
  data = signal<any>({})
  constructor() { }

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
      result[formattedDate] = { contribution: 0 };

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }
  async colorGenerator(contribution: number): Promise<string> {
    return await this.getGreenShadeDynamic(contribution)
  }

  getGreenShadeDynamic(contributions: number) {
    // Normalize the contributions to a range of 0–1
    const normalized = Math.min(contributions / 100, 1);

    // Generate the shade dynamically (Hue = 120° for green)
    const lightness = 100 - normalized * 70; // Lightness varies from 90% to 40%
    return `hsl(${this.options().gridHue}, 70%, ${lightness}%)`;
  }

  getGreenShadeDynamicOutline(contributions: number) {
    // Normalize the contributions to a range of 0–1
    const normalized = Math.min(contributions / 100, 1);

    // Generate the shade dynamically (Hue = 120° for green)
    const lightness = 100 - normalized * 70; // Lightness varies from 90% to 40%
    return `hsl(${this.options().gridHue}, 40%, ${lightness}%)`;
  }
}
