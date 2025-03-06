import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'i-dialog-actions',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './dialog-actions.component.html',
  styleUrl: './dialog-actions.component.scss',
})
export class DialogActionsComponent {
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
