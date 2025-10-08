import { Component } from '@angular/core';
import { IButton } from '../../../../../invensys-angular-shared/src/lib/components/button/button.component';

@Component({
  selector: 'app-buttons',
  imports: [IButton],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {}
