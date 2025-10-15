import { Component } from '@angular/core';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-buttons',
  imports: [IButton, CodeDisplayComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  // Source code strings for each button section
  contrastButtonsCode = `<i-button [severity]="'contrast'" [text]="true" [icon]="'pi pi-cloud-download'" [size]="'small'" />
  <i-button [severity]="'contrast'" [text]="true" [icon]="'pi pi-cloud-download'" [size]="'medium'" />
  <i-button [severity]="'contrast'" [text]="true" [icon]="'pi pi-cloud-download'" [size]="'large'" />`;

  successButtonsCode = `<i-button [severity]="'success'" [raised]="true">Hello Button</i-button>
<i-button [severity]="'success'" [raised]="true" [size]="'medium'">Hello Button</i-button>
<i-button [severity]="'success'" [raised]="true" [size]="'large'">Hello Button</i-button>`;

  warningButtonsCode = `<i-button [severity]="'warning'" [outlined]="true">Hello Button</i-button>
<i-button [severity]="'warning'" [outlined]="true" [size]="'medium'">Hello Button</i-button>
<i-button [severity]="'warning'" [outlined]="true" [size]="'large'">Hello Button</i-button>`;

  infoButtonsCode = `<i-button [severity]="'info'" [text]="true" [icon]="'pi pi-user'">Button with icon</i-button>
<i-button [severity]="'info'" [outlined]="true" [icon]="'pi pi-user'">Button with icon</i-button>
<i-button [severity]="'info'" [icon]="'pi pi-user'">Button with icon</i-button>`;

  fluidButtonsCode = `<i-button [severity]="'primary'" [fluid]="true">Fluid Primary Button</i-button>
<i-button [severity]="'secondary'" [fluid]="true" [outlined]="true">Fluid Outlined Button</i-button>
<i-button [severity]="'success'" [fluid]="true" [raised]="true">Fluid Raised Button</i-button>`;
}
