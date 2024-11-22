import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { GithubContributorsService } from './github-contributors.service';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {

  @Input() inputDate: string = '' // Input property to accept color
  private tooltipElement: HTMLElement | null = null;
  constructor(private el: ElementRef, private renderer: Renderer2, private service: GithubContributorsService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.highlight(this.service.data()[changes["inputDate"]?.currentValue]?.count || 0);
  }

  // Add highlight color on mouse enter
  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip()
  }

  // Remove highlight color on mouse leave
  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip()
  }
  private showTooltip() {
    if (!this.tooltipElement && this.service.data()[this.inputDate]?.tooltipText && this.service.data()[this.inputDate]?.tooltipText) {
      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.appendChild(document.body, this.tooltipElement);
      this.renderer.setProperty(this.tooltipElement, 'innerHTML', this.service.data()[this.inputDate].tooltipText);
      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(this.tooltipElement, 'top', `${this.el.nativeElement.getBoundingClientRect().top + window.scrollY - 20}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${this.el.nativeElement.getBoundingClientRect().left + window.scrollX}px`);
      this.renderer.setStyle(this.tooltipElement, 'background', this.service.options().tooltipBackgroundColor);
      this.renderer.setStyle(this.tooltipElement, 'color', this.service.options().tooltipTextColor);
      this.renderer.setStyle(this.tooltipElement, 'padding', '4px');
      this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
      this.renderer.setStyle(this.tooltipElement, 'font-size', '10px');
      this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    }
  }

  // Hide the tooltip
  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
  // Apply the background color
  private async highlight(contribution: number | null) {
    if (contribution) {
      this.el.nativeElement.style.backgroundColor = await this.service.colorGenerator(contribution)
      // will implement in next pipeline
      // this.el.nativeElement.style.outline = `0.0325em  solid ${await this.service.getGreenShadeDynamicOutline(contribution)}`;
    } else {
      this.el.nativeElement.style.backgroundColor = this.service.options().gridColor;
    }
  }


}
