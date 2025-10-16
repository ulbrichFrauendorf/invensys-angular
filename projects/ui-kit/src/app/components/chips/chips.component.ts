import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IChip } from '@shared/components/chip/chip.component';
import { IChips } from '@shared/components/chips/chips.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IChip,
    IChips,
    CodeDisplayComponent,
  ],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  basicForm: FormGroup;
  validationForm: FormGroup;

  basicChipCode = `<i-chip label="Action" />
<i-chip label="Comedy" />
<i-chip label="Mystery" />
<i-chip label="Thriller" [removable]="true" (onRemove)="onChipRemove($event)" />
<i-chip label="Apple" icon="pi pi-apple" />`;

  chipsInputCode = `<i-chips
  placeholder="Enter tags and press Enter"
  formControlName="tags"
></i-chips>`;

  validationCode = `<i-chips
  placeholder="Enter at least 2 tags"
  formControlName="requiredTags"
></i-chips>`;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      tags: [['angular', 'typescript']],
    });

    this.validationForm = this.fb.group({
      requiredTags: [
        [],
        [Validators.required, this.minArrayLengthValidator(2)],
      ],
    });
  }

  ngOnInit() {}

  onChipRemove(event: Event) {
    console.log('Chip removed:', event);
  }

  onSubmit(formName: string) {
    const form = this.getForm(formName);
    if (form?.valid) {
      console.log(`${formName} form submitted:`, form.value);
    } else {
      console.log(`${formName} form is invalid`, form?.errors);
      Object.keys(form?.controls || {}).forEach((key) => {
        const control = form?.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  private getForm(formName: string): FormGroup | null {
    switch (formName) {
      case 'basic':
        return this.basicForm;
      case 'validation':
        return this.validationForm;
      default:
        return null;
    }
  }

  private minArrayLengthValidator(minLength: number) {
    return (control: any) => {
      const value = control.value;
      if (!value || !Array.isArray(value) || value.length < minLength) {
        return {
          minArrayLength: {
            requiredLength: minLength,
            actualLength: value?.length || 0,
          },
        };
      }
      return null;
    };
  }
}
