import { Component, inject } from '@angular/core';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';

import { CodeDisplayComponent } from '../code-display/code-display.component';
import { IDialog } from '../../../../../invensys-angular-shared/src/lib/components/dialog/dialog.component';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';
import { DynamicDialogRef } from '../../../../../invensys-angular-shared/src/lib/components/dialog/services/dialog.interfaces';
import { DialogService } from '../../../../../invensys-angular-shared/src/lib/components/dialog/services/dialog.service';

@Component({
  selector: 'i-dialogs',
  imports: [IDialog, IButton, CodeDisplayComponent],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);

  showBasicDialog = false;

  // Source code strings for each dialog section
  dynamicDialogCode = `// Component
this.ref = this.dialogService.open(ExampleDialogComponent, {
  header: 'Example Dynamic Dialog',
  width: '300px',
  data: { message: 'Hello from Dialog Service!' }
});

// Button
<i-button severity="primary" (clicked)="displayExampleDialog()">
  Open Dynamic Dialog
</i-button>`;

  basicDialogCode = `<i-dialog
  [visible]="showBasicDialog"
  (visibleChange)="showBasicDialog = $event"
  (onHide)="onBasicDialogHide()"
  [closable]="true"
  header="Basic Dialog Example"
  width="20rem"
>
  <div class="basic-dialog-content">
    <h4>Basic Dialog</h4>
    <p>This is a basic dialog component.</p>
  </div>
</i-dialog>`;

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
