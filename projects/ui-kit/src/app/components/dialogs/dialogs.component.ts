import { Component, inject } from '@angular/core';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { IDialog } from '@shared/components/dialog/dialog.component';
import { IButton } from '@shared/components/button/button.component';
import { DynamicDialogRef } from '@shared/components/dialog/services/dialog.interfaces';
import { DialogService } from '@shared/components/dialog/services/dialog.service';
import { DemoCardComponent } from '../demo-card/demo-card.component';
import { IDialogActions } from '@shared/components/dialog/inner/dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-dialogs',
  imports: [IDialog, IButton, DemoCardComponent, IDialogActions],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);

  showBasicDialog = false;
  showResponsiveDialog = false;
  showFullscreenDialog = false;

  // Code examples organized by category
  codeExamples = {
    dynamic: `// 1. Import and inject the service
import { DialogService } from 'invensys-angular-shared/components/dialog/services/dialog.service';
import { DynamicDialogRef } from 'invensys-angular-shared/components/dialog/services/dialog.interfaces';

// In your component
ref: DynamicDialogRef | undefined;

constructor(private dialogService = inject(DialogService)) {}

// 2. Create your method
displayExampleDialog() {
  this.ref = this.dialogService.open(ExampleDialogComponent, {
    header: 'Example Dynamic Dialog',
    width: '300px',
    data: { message: 'Hello from Dialog Service!' },
    onSubmit: () => {
      console.log('Submit clicked!');
      // Handle submit logic
    },
    onCancel: () => {
      console.log('Cancel clicked!');
      // Handle cancel logic
    }
  });
}

// 3. Use in template
<i-button severity="primary" (clicked)="displayExampleDialog()">
  Open Dynamic Dialog
</i-button>`,

    basic: `<i-dialog
  [visible]="showBasicDialog"
  (visibleChange)="showBasicDialog = $event"
  (onHide)="onBasicDialogHide()"
  [closable]="true"
  header="Basic Dialog Example"
  width="20rem">
  <div class="dialog-content">
    <h4>Basic Dialog</h4>
    <p>This is a basic dialog component.</p>
  </div>
</i-dialog>`,

    responsive: `<i-dialog
  [visible]="showResponsiveDialog"
  (visibleChange)="showResponsiveDialog = $event"
  header="Responsive Dialog"
  width="50vw"
  [breakpoints]="{
    '960px': '75vw',
    '640px': '90vw'
  }">
  <div class="dialog-content">
    <p>This dialog adapts to different screen sizes.</p>
  </div>
</i-dialog>`,

    fullscreen: `<i-dialog
  [visible]="showFullscreenDialog"
  (visibleChange)="showFullscreenDialog = $event"
  header="Large Dialog"
  [modal]="true"
  width="80vw"
  height="80vh">
  <div class="dialog-content">
    <p>Large dialog for complex content.</p>
  </div>
</i-dialog>`,
  };

  features = [
    {
      title: 'Dynamic Dialog Service',
      description: 'Programmatically open dialogs with the DialogService',
    },
    {
      title: 'Template Dialogs',
      description: 'Declarative dialogs using the i-dialog component',
    },
    {
      title: 'Modal & Non-Modal',
      description: 'Support for both modal and non-modal dialog behaviors',
    },
    {
      title: 'Responsive Design',
      description: 'Breakpoint-based responsive sizing for mobile devices',
    },
    {
      title: 'Large Dialogs',
      description: 'Support for large viewport dimensions',
    },
    {
      title: 'Header & Footer',
      description: 'Customizable header and footer content areas',
    },
    {
      title: 'Keyboard Support',
      description: 'ESC key to close and focus management',
    },
    {
      title: 'Accessibility',
      description: 'ARIA compliant with proper focus trapping',
    },
  ];

  displayExampleDialog() {
    this.ref = this.dialogService.open(ExampleDialogComponent, {
      header: 'Example Dynamic Dialog',
      width: '600px',
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

    this.ref.onClose.subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }

  showBasicDialogModal() {
    this.showBasicDialog = true;
  }

  showResponsiveDialogModal() {
    this.showResponsiveDialog = true;
  }

  showFullscreenDialogModal() {
    this.showFullscreenDialog = true;
  }

  onBasicDialogHide() {
    this.showBasicDialog = false;
  }

  onResponsiveDialogHide() {
    this.showResponsiveDialog = false;
  }

  onFullscreenDialogHide() {
    this.showFullscreenDialog = false;
  }
}
