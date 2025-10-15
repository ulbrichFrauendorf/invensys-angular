import { Component, inject } from '@angular/core';
import { ConfirmationDialogService } from '../../../../../invensys-angular-shared/src/lib/components/confirmation-dialog/services/confirmation-dialog.service';

import { CodeDisplayComponent } from '../code-display/code-display.component';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';

@Component({
  selector: 'app-confirmation-dialogs',
  imports: [IButton, CodeDisplayComponent],
  templateUrl: './confirmation-dialogs.component.html',
  styleUrl: './confirmation-dialogs.component.scss',
})
export class ConfirmationDialogsComponent {
  private confirmationService = inject(ConfirmationDialogService);

  // Source code strings for each confirmation dialog section
  basicConfirmationCode = `await this.confirmationService.confirm({
  message: 'Are you sure you want to delete this item?',
  header: 'Are you sure?',
  accept: () => {
    console.log('Item deleted');
  },
  reject: () => {
    console.log('Delete cancelled');
  },
});`;

  customConfirmationCode = `await this.confirmationService.confirm({
  message: 'Please confirm if you would like to unlink the report.',
  header: 'Are you sure?',
  acceptLabel: 'Unlink',
  rejectLabel: 'Cancel',
  accept: () => {
    console.log('Unlink confirmed');
  },
  reject: () => {
    console.log('Unlink cancelled');
  },
});`;

  discardChangesCode = `await this.confirmationService.confirm({
  message: 'You have unsaved changes. Are you sure you want to discard them?',
  header: 'Discard Changes',
  acceptLabel: 'Discard',
  rejectLabel: 'Keep Editing',
  accept: () => {
    console.log('Changes discarded');
  },
  reject: () => {
    console.log('Continue editing');
  },
});`;

  async showBasicConfirmation() {
    await this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      accept: () => {
        console.log('Item deleted');
      },
      reject: () => {
        console.log('Delete cancelled');
      },
    });
  }

  async showCustomConfirmation() {
    await this.confirmationService.confirm({
      message:
        'Please confirm if you would like to unlink the report from the organization.',
      header: 'Are you sure?',
      acceptLabel: 'Unlink',
      rejectLabel: 'Cancel',
      accept: () => {
        const reportId = '12345';
        console.log('Unlink report with id:', reportId);
      },
      reject: () => {
        console.log('Report unlink cancelled');
      },
    });
  }

  async showDiscardChanges() {
    await this.confirmationService.confirm({
      message:
        'You have unsaved changes. Are you sure you want to discard them?',
      header: 'Discard Changes',
      acceptLabel: 'Discard',
      rejectLabel: 'Keep Editing',
      accept: () => {
        console.log('Changes discarded');
      },
      reject: () => {
        console.log('Continue editing');
      },
    });
  }
}
