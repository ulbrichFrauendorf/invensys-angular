import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from '../../../button/button.component';

@Component({
  selector: 'i-dialog-actions',
  imports: [IButton],
  templateUrl: './dialog-actions.component.html',
  styleUrl: './dialog-actions.component.scss',
})
export class IDialogActions {
  @Input() submitLabel = 'Submit';
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();

  onCancel() {
    this.cancelEvent.emit();
  }

  onSubmit() {
    this.submitEvent.emit();
  }
}
