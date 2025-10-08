import { Component } from '@angular/core';
import { ICard } from '../../../../../invensys-angular-shared/src/lib/components/card/card.component';

@Component({
  selector: 'i-cards',
  imports: [ICard],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  showClosableCard = true;

  onCardClosed() {
    this.showClosableCard = false;
    // Reset after 3 seconds for demo purposes
    setTimeout(() => {
      this.showClosableCard = true;
    }, 3000);
  }
}
