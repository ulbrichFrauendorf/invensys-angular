import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IDialogActions } from '../../../../../invensys-angular-shared/src/lib/components/dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-example-dialog',
  imports: [JsonPipe, IDialogActions],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
})
export class ExampleDialogComponent {
  @Input() data?: any;
  @Input() dialogRef?: any;

  onAccept() {
    console.log('Accepted');
    this.dialogRef?.close('accepted');
  }

  onReject() {
    console.log('Rejected');
    this.dialogRef?.close('rejected');
  }

  onBasicDialogHide() {
    this.dialogRef?.close();
  }
}
