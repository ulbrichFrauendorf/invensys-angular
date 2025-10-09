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
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        message: config.message,
        acceptLabel: config.acceptLabel || 'Yes',
        rejectLabel: config.rejectLabel || 'No',
      },
    });

    ref.onClose.then((result) => {
      if (result === 'accept' && config.accept) {
        config.accept();
      } else if (result === 'reject' && config.reject) {
        config.reject();
      }
    });

    return ref;
  }
}
