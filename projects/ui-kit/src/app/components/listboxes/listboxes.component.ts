import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IListbox } from '@shared/components/listbox/listbox.component';
import { DemoCardComponent } from '../demo-card/demo-card.component';

@Component({
  selector: 'app-listboxes',
  standalone: true,
  imports: [CommonModule, FormsModule, IListbox, DemoCardComponent],
  templateUrl: './listboxes.component.html',
  styleUrls: ['./listboxes.component.scss', '../shared-demo-styles.scss'],
})
export class ListboxesComponent {
  // Sample data for the listbox
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Italy', code: 'IT' },
    { name: 'Spain', code: 'ES' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Australia', code: 'AU' },
  ];

  // Multiple selection listbox values
  selectedCountriesMultiple: string[] = ['US', 'CA'];

  // Single selection listbox value
  selectedCountrySingle: string | null = 'UK';

  onMultipleSelectionChange(value: string[]) {
    console.log('Multiple selection changed:', value);
    this.selectedCountriesMultiple = value;
  }

  onSingleSelectionChange(value: string | null) {
    console.log('Single selection changed:', value);
    this.selectedCountrySingle = value;
  }

  onClear() {
    console.log('Selection cleared');
  }

  // Features list for the component
  features = [
    {
      title: 'Always Visible Options',
      description:
        'Unlike dropdowns, all options are always visible on the screen.',
    },
    {
      title: 'Single & Multiple Selection',
      description:
        'Configure with [multiple] property to control selection behavior.',
    },
    {
      title: 'Chip Display',
      description:
        'Selected items are displayed as removable chips for both single and multiple selection modes.',
    },
    {
      title: 'Built-in Filtering',
      description:
        'Optional search functionality to filter through large option lists.',
    },
    {
      title: 'Form Integration',
      description:
        'Full support for Angular reactive forms and template-driven forms.',
    },
    {
      title: 'Accessibility',
      description:
        'ARIA support and keyboard navigation for better user experience.',
    },
  ];

  // Code examples for demo cards
  codeExamples = {
    multiple: `// Component setup
countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' }
];

selectedCountriesMultiple: string[] = ['US', 'CA'];

// Template usage
<i-listbox
  label="Select Countries (Multiple)"
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  [showClear]="true"
  [(ngModel)]="selectedCountriesMultiple"
  (onChange)="onMultipleSelectionChange($event)"
  (onClear)="onClear()">
</i-listbox>`,

    single: `// Component setup
selectedCountrySingle: string | null = 'UK';

// Template usage - Single select with chip display
<i-listbox
  label="Select Country (Single)"
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [multiple]="false"
  [showClear]="true"
  [(ngModel)]="selectedCountrySingle"
  (onChange)="onSingleSelectionChange($event)"
  (onClear)="onClear()">
</i-listbox>`,

    filter: `<i-listbox
  label="Searchable Countries"
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  [filter]="true"
  filterBy="name"
  [showClear]="true">
</i-listbox>`,

    fluid: `<i-listbox
  label="Full Width Listbox"
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  [fluid]="true"
  [showClear]="true">
</i-listbox>`,

    disabled: `<i-listbox
  label="Disabled Listbox"
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [multiple]="true"
  [disabled]="true"
  [ngModel]="['US', 'CA']">
</i-listbox>`,
  };
}
