import {
  Injectable,
  ComponentRef,
  ViewContainerRef,
  Injector,
  Type,
  createComponent,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { IDialog } from '../dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from './dialog.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private environmentInjector = inject(EnvironmentInjector);

  open<T>(
    component: Type<T>,
    config: DynamicDialogConfig = {}
  ): DynamicDialogRef {
    console.log('DialogService.open called with:', component, config);

    // Create the dialog wrapper component
    const dialogRef = createComponent(IDialog, {
      environmentInjector: this.environmentInjector,
    });
    console.log('Dialog component created:', dialogRef);

    // Create the dynamic component to be displayed inside the dialog
    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
    });
    console.log('Dynamic component created:', componentRef);

    // Set dialog properties
    dialogRef.instance.header = config.header;
    dialogRef.instance.width = config.width || '50rem';
    dialogRef.instance.height = config.height;
    dialogRef.instance.contentStyle = config.contentStyle;
    dialogRef.instance.breakpoints = config.breakpoints;
    dialogRef.instance.closable = config.closable !== false;
    dialogRef.instance.modal = config.modal !== false;

    console.log('Dialog properties set:', {
      header: dialogRef.instance.header,
      width: dialogRef.instance.width,
      closable: dialogRef.instance.closable,
      visible: dialogRef.instance.visible,
    });

    // Create the dialog reference first so we can pass it to the component
    let resolveClose: (result?: any) => void;
    const ref: DynamicDialogRef = {
      close: (result?: any) => {
        dialogRef.instance.hide();
        setTimeout(() => {
          // Remove from DOM and destroy components
          if (dialogRef.location.nativeElement.parentNode) {
            dialogRef.location.nativeElement.parentNode.removeChild(
              dialogRef.location.nativeElement
            );
          }
          componentRef.destroy();
          dialogRef.destroy();
        }, 300); // Wait for animation
        if (resolveClose) resolveClose(result);
      },
      onClose: new Promise((resolve) => {
        resolveClose = resolve;
      }),
    };

    // Inject data and dialog reference into the dynamic component
    if (componentRef.instance && typeof componentRef.instance === 'object') {
      if (config.data && 'data' in componentRef.instance) {
        (componentRef.instance as any).data = config.data;
      }
      if ('dialogRef' in componentRef.instance) {
        (componentRef.instance as any).dialogRef = ref;
      }
    }

    // Append dialog to body first
    document.body.appendChild(dialogRef.location.nativeElement);
    console.log('Dialog appended to body');

    // Show the dialog and wait for the next tick to ensure DOM is rendered
    dialogRef.instance.show();
    console.log('Dialog show() called');

    // Use setTimeout to ensure the DOM is updated before inserting dynamic component
    setTimeout(() => {
      console.log(
        'Looking for .i-dialog-content in:',
        dialogRef.location.nativeElement
      );
      // Insert the dynamic component into the dialog content
      const dialogContent =
        dialogRef.location.nativeElement.querySelector('.i-dialog-content');
      console.log('Found dialog content:', dialogContent);
      if (dialogContent) {
        dialogContent.appendChild(componentRef.location.nativeElement);
        console.log('Dynamic component appended to dialog content');
      } else {
        console.error('Could not find .i-dialog-content element');
      }
    }, 100); // Increased timeout to 100ms

    // Handle dialog close events
    dialogRef.instance.onHide.subscribe(() => {
      ref.close();
    });

    return ref;
  }
}
