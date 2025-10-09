import { Component, inject } from '@angular/core';
import { ConfirmationDialogService, IButton } from 'invensys-angular-shared';

@Component({
  selector: 'app-confirmation-dialogs',
  imports: [IButton],
  templateUrl: './confirmation-dialogs.component.html',
  styleUrl: './confirmation-dialogs.component.scss',
})
export class ConfirmationDialogsComponent {
  private confirmationService = inject(ConfirmationDialogService);

  async showBasicConfirmation() {
    await this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Confirmation',
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
