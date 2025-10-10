import { Injectable, Type } from '@angular/core';
import { DialogService } from '../../dialog/services/dialog.service';
import { DynamicDialogRef } from '../../dialog/services/dialog.interfaces';

export interface ConfirmationDialogConfig {
  message: string;
  header?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  accept?: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialogService: DialogService) {}

  async confirm(config: ConfirmationDialogConfig): Promise<DynamicDialogRef> {
    const { ConfirmationDialogComponent } = await import(
      '../confirmation-dialog.component'
    );

    const ref = this.dialogService.open(ConfirmationDialogComponent, {
      header: config.header || 'Confirmation',
      width: '400px',
      submitLabel: config.acceptLabel || 'Yes',
      cancelLabel: config.rejectLabel || 'No',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        message: config.message,
      },
    });

    // Set up event handlers on the dialog instance
    if (ref.instance) {
      const dialogInstance = ref.instance;

      // Subscribe to submit event (accept)
      dialogInstance.submitEvent.subscribe(() => {
        if (config.accept) {
          config.accept();
        }
        ref.close('accept');
      });

      // Subscribe to cancel event (reject)
      dialogInstance.cancelEvent.subscribe(() => {
        if (config.reject) {
          config.reject();
        }
        ref.close('reject');
      });
    }

    return ref;
  }
}
