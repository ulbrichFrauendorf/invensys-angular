import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogActionsComponent } from '../dialog-actions/dialog-actions.component';
import { IButton } from 'invensys-angular-shared';

@Component({
    selector: 'i-confirmation-dialog',
    imports: [IButton, ConfirmDialogModule, DialogActionsComponent],
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {}
