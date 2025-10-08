import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-example-dialog',
  imports: [JsonPipe],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
})
export class ExampleDialogComponent {
  @Input() data?: any;
  @Input() dialogRef?: any;

  onAccept() {
    this.dialogRef?.close('accepted');
  }

  onReject() {
    this.dialogRef?.close('rejected');
  }

  onBasicDialogHide() {
    this.dialogRef?.close();
  }
}
