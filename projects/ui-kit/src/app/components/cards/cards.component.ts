import { Component } from '@angular/core';
import { ICard } from '../../../../../invensys-angular-shared/src/lib/components/card/card.component';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'i-cards',
  imports: [ICard, IButton, CodeDisplayComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  showClosableCard = true;

  // Source code strings for each card section
  basicCardCode = `<i-card title="Card Title" subtitle="Optional subtitle">
  <p>This is the card content in the body section.</p>
</i-card>`;

  cardWithFooterCode = `<i-card title="Card with Actions">
  <p>This card includes footer content.</p>
  <div slot="footer">
    <i-button severity="primary">Action</i-button>
  </div>
</i-card>`;

  customHeaderCode = `<i-card>
  <div slot="header">
    <h3>Custom Header Content</h3>
  </div>
  <p>Using the header slot for custom content.</p>
</i-card>`;

  contentOnlyCode = `<i-card>
  <p>Simple card with just content, no title or footer.</p>
</i-card>`;

  closableCardCode = `<i-card
  title="Closable Card"
  [closable]="true"
  (closeCard)="onCardClosed()"
>
  <p>This card can be closed using the X button in the header.</p>
  <p>
    <small>It will reappear after 3 seconds for demo purposes.</small>
  </p>
</i-card>`;

  onCardClosed() {
    this.showClosableCard = false;
    // Reset after 3 seconds for demo purposes
    setTimeout(() => {
      this.showClosableCard = true;
    }, 3000);
  }
}
