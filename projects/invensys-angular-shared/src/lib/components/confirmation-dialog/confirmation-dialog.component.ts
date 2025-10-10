import { Component } from '@angular/core';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from '../dialog/services/dialog.interfaces';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

@Component({
  selector: 'i-confirmation-dialog',
  imports: [],
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
}
