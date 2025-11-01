import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
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

  acceptLabel?: string;
  rejectLabel?: string;

  async confirm(config: ConfirmationDialogConfig): Promise<DynamicDialogRef> {
    const { ConfirmationDialogComponent } = await import(
      '../confirmation-dialog.component'
    );

    this.acceptLabel = config.acceptLabel || 'Confirm';
    this.rejectLabel = config.rejectLabel || 'Cancel';

    const ref = this.dialogService.open(ConfirmationDialogComponent, {
      header: ' ',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        message: config.message,
        header: config.header,
      },
    });

    // Subscribe to dialog close event to execute callbacks
    ref.onClose.pipe(take(1)).subscribe((result: boolean) => {
      if (result === true && config.accept) {
        config.accept();
      } else if (result === false && config.reject) {
        config.reject();
      }
    });

    return ref;
  }
}
