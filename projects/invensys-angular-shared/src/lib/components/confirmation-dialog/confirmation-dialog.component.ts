import { Component, signal, OnInit } from '@angular/core';
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
export class ConfirmationDialogComponent implements OnInit {
  public dialogRef?: DynamicDialogRef;
  public config: DynamicDialogConfig = {};

  componentId = UniqueComponentId('i-confirmation-dialog-');

  message = signal('');
  header = signal('Are you sure?');

  ngOnInit() {
    // Update signals after config is set by the dialog service
    this.message.set(this.config.data?.message || '');
    this.header.set(this.config.data?.header || 'Are you sure?');
  }
}
