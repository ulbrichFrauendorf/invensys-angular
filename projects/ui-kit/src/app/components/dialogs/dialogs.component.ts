import { Component, inject } from '@angular/core';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import {
  IDialog,
  DialogService,
  DynamicDialogRef,
} from 'invensys-angular-shared';

@Component({
  selector: 'i-dialogs',
  imports: [IDialog],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);

  showBasicDialog = false;

  displayExampleDialog() {
    this.ref = this.dialogService.open(ExampleDialogComponent, {
      header: 'Example Dynamic Dialog',
      width: '300px',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        message: 'Hello from Dialog Service!',
        timestamp: new Date().toISOString(),
        user: 'Test User',
      },
    });

    this.ref.onClose.then((result) => {
      console.log('Dialog closed with result:', result);
    });
  }

  showBasicDialogModal() {
    this.showBasicDialog = true;
  }

  onBasicDialogHide() {
    this.showBasicDialog = false;
  }
}
