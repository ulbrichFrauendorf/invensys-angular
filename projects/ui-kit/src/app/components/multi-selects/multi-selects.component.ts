import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IMultiSelect } from '@shared/components/multi-select/multi-select.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

export interface MultiSelectOption {
  value: any;
  label?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-multi-selects',
  imports: [IMultiSelect, ReactiveFormsModule, CodeDisplayComponent],
  templateUrl: './multi-selects.component.html',
  styleUrl: './multi-selects.component.scss',
})
export class MultiSelectsComponent implements OnInit {
  basicForm: FormGroup;
  validationForm: FormGroup;
  customForm: FormGroup;
  fluidForm: FormGroup;

  // Sample data
  skills: MultiSelectOption[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
  ];

  departments: MultiSelectOption[] = [
    { value: 1, label: 'Sales' },
    { value: 2, label: 'Marketing' },
    { value: 3, label: 'Engineering' },
    { value: 4, label: 'Human Resources' },
    { value: 5, label: 'Finance' },
    { value: 6, label: 'Operations' },
  ];

  formFieldOptions: MultiSelectOption[] = [
    { value: 'option1', formFieldOptions: 'Option 1' },
    { value: 'option2', formFieldOptions: 'Option 2' },
    { value: 'option3', formFieldOptions: 'Option 3' },
    { value: 'option4', formFieldOptions: 'Option 4' },
  ];

  // Source code strings
  basicMultiSelectCode = `<i-multi-select 
  label="Skills" 
  [options]="skills" 
  optionLabel="label" 
  optionValue="value" 
  placeholder="Select skills" 
  formControlName="skills">
</i-multi-select>`;

  primeNgStyleCode = `<i-multi-select
  formControlName="fieldName"
  [options]="formFieldOptions"
  placeholder="Select options"
  optionLabel="formFieldOptions"
  optionValue="value">
</i-multi-select>`;

  requiredMultiSelectCode = `<i-multi-select 
  label="Departments (Required)" 
  [options]="departments" 
  placeholder="Select departments" 
  formControlName="departments">
</i-multi-select>`;

  fluidMultiSelectCode = `<i-multi-select 
  label="Fluid Multi Select" 
  [options]="skills" 
  [fluid]="true" 
  placeholder="Select options" 
  formControlName="fluidMultiSelect">
</i-multi-select>`;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      skills: [[]],
      departments: [[]],
      preselected: [['javascript', 'angular']],
      disabled: [{ value: ['sales'], disabled: true }],
    });

    this.validationForm = this.fb.group({
      departments: [[], [Validators.required]],
    });

    this.customForm = this.fb.group({
      fieldName: [[]],
    });

    this.fluidForm = this.fb.group({
      fluidMultiSelect: [[]],
    });
  }

  ngOnInit() {
    // Mark validation field as touched to show error
    setTimeout(() => {
      this.validationForm.get('departments')?.markAsTouched();
    }, 100);
  }

  onSelectionChange() {
    console.log(
      'Multi-select changed:',
      this.customForm.get('fieldName')?.value
    );
  }

  onSelectionClear() {
    console.log('Multi-select cleared');
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
