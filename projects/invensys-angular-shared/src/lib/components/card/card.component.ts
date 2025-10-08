import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IButton } from '../button/button.component';

@Component({
  selector: 'i-card',
  imports: [IButton],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class ICard {
  @Input() title?: string;
  @Input() closable: boolean = false;
  @Output() closeCard = new EventEmitter<void>();

  onCloseCard() {
    this.closeCard.emit();
  }
}
