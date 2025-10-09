import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'invensys-angular-shared';

@Component({
  selector: 'app-example-dialog',
  imports: [JsonPipe],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
})
export class ExampleDialogComponent {
  public dialogRef?: DynamicDialogRef;
  public config: DynamicDialogConfig = {};

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
