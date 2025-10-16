import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ISelect } from '@shared/components/select/select.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

export interface SelectOption {
  value: any;
  label?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-selects',
  imports: [ISelect, ReactiveFormsModule, CodeDisplayComponent],
  templateUrl: './selects.component.html',
  styleUrl: './selects.component.scss',
})
export class SelectsComponent implements OnInit {
  basicForm: FormGroup;
  validationForm: FormGroup;
  customForm: FormGroup;
  fluidForm: FormGroup;

  // Sample data
  countries: SelectOption[] = [
    { value: 'us', label: 'United States', code: 'US' },
    { value: 'uk', label: 'United Kingdom', code: 'GB' },
    { value: 'de', label: 'Germany', code: 'DE' },
    { value: 'fr', label: 'France', code: 'FR' },
    { value: 'it', label: 'Italy', code: 'IT' },
    { value: 'es', label: 'Spain', code: 'ES' },
    { value: 'ca', label: 'Canada', code: 'CA' },
    { value: 'au', label: 'Australia', code: 'AU' },
    { value: 'jp', label: 'Japan', code: 'JP' },
    { value: 'br', label: 'Brazil', code: 'BR' },
  ];

  reports: SelectOption[] = [
    { value: 1, name: 'Monthly Sales Report', department: 'Sales' },
    { value: 2, name: 'Quarterly Performance Report', department: 'Finance' },
    {
      value: 3,
      name: 'Customer Satisfaction Report',
      department: 'Customer Service',
    },
    { value: 4, name: 'Inventory Status Report', department: 'Operations' },
    { value: 5, name: 'Employee Performance Report', department: 'HR' },
  ];

  statuses: SelectOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
  ];

  // Source code strings
  basicSelectCode = `<i-select 
  label="Country" 
  [options]="countries" 
  optionLabel="label" 
  optionValue="value" 
  placeholder="Select a country" 
  formControlName="country">
</i-select>`;

  reportSelectCode = `<i-select 
  [options]="reports" 
  [filter]="true" 
  [showClear]="true" 
  filterBy="name" 
  optionLabel="name" 
  optionValue="value" 
  placeholder="Select Report" 
  formControlName="selectedReport">
</i-select>`;

  requiredSelectCode = `<i-select 
  label="Status" 
  [options]="statuses" 
  placeholder="Select status" 
  formControlName="status">
</i-select>`;

  fluidSelectCode = `<i-select 
  label="Fluid Select" 
  [options]="countries" 
  [fluid]="true" 
  placeholder="Select option" 
  formControlName="fluidSelect">
</i-select>`;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      country: [''],
      status: [''],
      preselected: ['us'],
      disabled: [{ value: 'uk', disabled: true }],
    });

    this.validationForm = this.fb.group({
      status: ['', [Validators.required]],
    });

    this.customForm = this.fb.group({
      selectedReport: [''],
    });

    this.fluidForm = this.fb.group({
      fluidSelect: [''],
    });
  }

  ngOnInit() {
    // Mark validation field as touched to show error
    setTimeout(() => {
      this.validationForm.get('status')?.markAsTouched();
    }, 100);
  }

  onReportChange() {
    console.log(
      'Report changed:',
      this.customForm.get('selectedReport')?.value
    );
  }

  onReportClear() {
    console.log('Report cleared');
  }

  onSubmit(formName: string) {
    console.log(`${formName} submitted:`, this.getFormValue(formName));
  }

  private getFormValue(formName: string) {
    switch (formName) {
      case 'basic':
        return this.basicForm.value;
      case 'validation':
        return this.validationForm.value;
      case 'custom':
        return this.customForm.value;
      case 'fluid':
        return this.fluidForm.value;
      default:
        return {};
    }
  }
}
