import { Routes } from '@angular/router';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { InputTextsComponent } from './components/input-texts/input-texts.component';
import { CardsComponent } from './components/cards/cards.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { ConfirmationDialogsComponent } from './components/confirmation-dialogs/confirmation-dialogs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { MultiSelectsComponent } from './components/multi-selects/multi-selects.component';
import { SelectsComponent } from './components/selects/selects.component';
import { ChipsComponent } from './components/chips/chips.component';

export const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent },
  { path: 'input-texts', component: InputTextsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'dialogs', component: DialogsComponent },
  { path: 'confirmation-dialogs', component: ConfirmationDialogsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'selects', component: SelectsComponent },
  { path: 'multi-selects', component: MultiSelectsComponent },
  { path: 'chips', component: ChipsComponent },
  { path: '', redirectTo: '/input-texts', pathMatch: 'full' },
];
