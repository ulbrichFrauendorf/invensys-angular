import { Component } from '@angular/core';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from '../dialog/services/dialog.interfaces';
import { IButton } from '../button/button.component';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

@Component({
  selector: 'i-confirmation-dialog',
  imports: [IButton],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  public dialogRef?: DynamicDialogRef;
  public config: DynamicDialogConfig = {};

  componentId = UniqueComponentId('i-confirmation-dialog-');

  get message(): string {
    return this.config.data?.message || '';
  }

  get acceptLabel(): string {
    return this.config.data?.acceptLabel || 'Yes';
  }

  get rejectLabel(): string {
    return this.config.data?.rejectLabel || 'No';
  }

  onAccept() {
    this.dialogRef?.close('accept');
  }

  onReject() {
    this.dialogRef?.close('reject');
  }
}
