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
    // Create the dialog wrapper component
    const dialogRef = createComponent(IDialog, {
      environmentInjector: this.environmentInjector,
    });

    // Create the dynamic component to be displayed inside the dialog
    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
    });

    // Set dialog properties
    dialogRef.instance.header = config.header;
    dialogRef.instance.width = config.width || '300px';
    dialogRef.instance.height = config.height;
    dialogRef.instance.submitLabel = config.submitLabel || 'Submit';
    dialogRef.instance.cancelLabel = config.cancelLabel || 'Cancel';
    dialogRef.instance.contentStyle = config.contentStyle;
    dialogRef.instance.breakpoints = config.breakpoints;
    dialogRef.instance.closable = config.closable !== false;
    dialogRef.instance.modal = config.modal !== false;

    // Create the dialog reference first so we can pass it to the component
    let resolveClose: (result?: any) => void;
    let isClosing = false; // Flag to prevent circular calls

    const ref: DynamicDialogRef = {
      close: (result?: any) => {
        if (isClosing) return; // Prevent circular calls
        isClosing = true;

        dialogRef.instance.hide();
        if (dialogRef.location.nativeElement.parentNode) {
          dialogRef.location.nativeElement.parentNode.removeChild(
            dialogRef.location.nativeElement
          );
        }
        componentRef.destroy();
        dialogRef.destroy();
        if (resolveClose) resolveClose(result);
      },
      onClose: new Promise((resolve) => {
        resolveClose = resolve;
      }),
      instance: dialogRef.instance,
    };

    // Inject data and dialog reference into the dynamic component
    if (componentRef.instance && typeof componentRef.instance === 'object') {
      if (config.data && 'data' in componentRef.instance) {
        (componentRef.instance as any).data = config.data;
      }
      if ('dialogRef' in componentRef.instance) {
        (componentRef.instance as any).dialogRef = ref;
      }
      if ('config' in componentRef.instance) {
        (componentRef.instance as any).config = config;
      }
    }

    // Trigger change detection to ensure ngOnInit is called with the injected data
    componentRef.changeDetectorRef.detectChanges();

    document.body.appendChild(dialogRef.location.nativeElement);

    // Show the dialog and wait for the next tick to ensure DOM is rendered
    dialogRef.instance.show();

    // Insert the dynamic component into the dialog content
    const dialogContent =
      dialogRef.location.nativeElement.querySelector('.i-dialog-content');
    if (dialogContent) {
      dialogContent.appendChild(componentRef.location.nativeElement);
    }

    // Handle dialog close events
    dialogRef.instance.onHide.subscribe(() => {
      if (!isClosing) {
        ref.close();
      }
    });

    return ref;
  }
}
