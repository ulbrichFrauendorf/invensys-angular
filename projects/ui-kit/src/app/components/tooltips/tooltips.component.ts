import { Component } from '@angular/core';
import { TooltipDirective } from '../../../../../invensys-angular-shared/src/lib/directives/tooltip/tooltip.directive';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-tooltips',
  imports: [TooltipDirective, IButton, CodeDisplayComponent],
  templateUrl: './tooltips.component.html',
  styleUrl: './tooltips.component.scss',
})
export class TooltipsComponent {
  // Source code strings for each tooltip section
  basicTooltipsCode = `<i-button iTooltip="This is a tooltip above" tooltipPosition="above">Hover Above</i-button>
<i-button iTooltip="This is a tooltip below" tooltipPosition="below">Hover Below</i-button>
<i-button iTooltip="This is a tooltip to the left" tooltipPosition="left">Hover Left</i-button>
<i-button iTooltip="This is a tooltip to the right" tooltipPosition="right">Hover Right</i-button>`;

  buttonTooltipsCode = `<i-button [severity]="'primary'" iTooltip="Primary action button" tooltipPosition="above">
  Primary Button
</i-button>
<i-button [severity]="'secondary'" [outlined]="true" iTooltip="Secondary action button" tooltipPosition="below">
  Secondary Button
</i-button>
<i-button [severity]="'success'" [raised]="true" iTooltip="Success action completed" tooltipPosition="left">
  Success Button
</i-button>
<i-button [severity]="'warning'" [text]="true" iTooltip="Warning: This action requires confirmation" tooltipPosition="right">
  Warning Button
</i-button>`;

  htmlElementTooltipsCode = `<span iTooltip="This is a span with tooltip" tooltipPosition="above" class="tooltip-span">
  Hover over this text
</span>

<div iTooltip="This is a div container" tooltipPosition="below" class="tooltip-div">
  Hover over this box
</div>

<p iTooltip="Paragraph with helpful information" tooltipPosition="right" class="tooltip-paragraph">
  This paragraph has a tooltip. Hover to see more information about this content.
</p>`;

  customDelayTooltipsCode = `<i-button iTooltip="Fast tooltip (100ms)" tooltipPosition="above" [tooltipDelay]="100">
  Fast Tooltip
</i-button>
<i-button iTooltip="Normal tooltip (500ms)" tooltipPosition="above" [tooltipDelay]="500">
  Normal Tooltip  
</i-button>
<i-button iTooltip="Slow tooltip (1000ms)" tooltipPosition="above" [tooltipDelay]="1000">
  Slow Tooltip
</i-button>`;

  longTextTooltipsCode = `<i-button iTooltip="This is a very long tooltip text that will wrap to multiple lines when the content exceeds the maximum width of the tooltip container" tooltipPosition="above">
  Long Tooltip
</i-button>
<span iTooltip="Multi-line tooltip with detailed information about this specific feature and how to use it effectively" tooltipPosition="right" class="tooltip-span">
  Detailed Info
</span>`;
}
