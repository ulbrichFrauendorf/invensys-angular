import { Component, inject } from '@angular/core';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { IDialog } from '../../../../../invensys-angular-shared/src/lib/components/dialog/dialog.component';
import { DialogService } from '../../../../../invensys-angular-shared/src/lib/components/dialog/services/dialog.service';
import { DynamicDialogRef } from '../../../../../invensys-angular-shared/src/lib/components/dialog/services/dialog.interfaces';
import { IDialogActions } from '../../../../../invensys-angular-shared/src/lib/components/dialog-actions/dialog-actions.component';

@Component({
  selector: 'i-dialogs',
  imports: [IDialog, IDialogActions],
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
      width: '50rem',
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
