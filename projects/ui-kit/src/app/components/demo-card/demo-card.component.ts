import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICard } from '@shared/components/card/card.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-demo-card',
  standalone: true,
  imports: [CommonModule, ICard, CodeDisplayComponent],
  template: `
    <i-card [title]="title">
      <div class="demo-card-content">
        <div class="demo-section">
          <ng-content></ng-content>
        </div>

        @if (sourceCode) {
        <app-code-display [sourceCode]="sourceCode"></app-code-display>
        }
      </div>
    </i-card>
  `,
  styles: [
    `
      .demo-card-content {
        padding: 20px 0;
      }

      .demo-section {
        margin-bottom: 20px;
      }
    `,
  ],
})
export class DemoCardComponent {
  @Input() title!: string;
  @Input() sourceCode?: string;
}
