import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IInputText } from '../../../../../invensys-angular-shared/src/lib/components/input-text/input-text.component';

@Component({
  selector: 'app-input-texts',
  imports: [IInputText, ReactiveFormsModule],
  templateUrl: './input-texts.component.html',
  styleUrl: './input-texts.component.scss',
})
export class InputTextsComponent implements OnInit {
  basicForm: FormGroup;
  validationForm: FormGroup;
  customErrorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      textInput: [''],
      emailInput: [''],
      passwordInput: [''],
      numberInput: [''],
      searchInput: [''],
      urlInput: [''],
      prefilledInput: ['This field has a pre-filled value'],
      disabledInput: [{ value: 'This field is disabled', disabled: true }],
    });

    this.validationForm = this.fb.group({
      requiredField: ['', [Validators.required]],
      minLengthField: ['', [Validators.minLength(5)]],
      maxLengthField: ['', [Validators.maxLength(10)]],
      patternField: ['', [Validators.pattern(/^[A-Za-z]+$/)]],
      emailValidation: ['', [Validators.required, Validators.email]],
      combinedValidation: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });

    this.customErrorForm = this.fb.group({
      usernameField: ['', [Validators.required, Validators.minLength(3)]],
      phoneField: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit() {
    // Mark some fields as touched to show validation errors initially
    setTimeout(() => {
      this.validationForm.get('requiredField')?.markAsTouched();
      this.validationForm.get('minLengthField')?.setValue('abc');
      this.validationForm.get('minLengthField')?.markAsTouched();
      this.validationForm
        .get('maxLengthField')
        ?.setValue('this text is too long for validation');
      this.validationForm.get('maxLengthField')?.markAsTouched();
      this.validationForm.get('patternField')?.setValue('123invalid');
      this.validationForm.get('patternField')?.markAsTouched();
    }, 100);
  }

  // Custom error messages
  usernameErrors = {
    required: 'Username is mandatory',
    minlength: 'Username must be at least 3 characters long',
  };

  phoneErrors = {
    required: 'Phone number is required',
    pattern: 'Please enter a valid 10-digit phone number',
  };

  onSubmit(formName: string) {
    console.log(`${formName} submitted:`, this.getFormValue(formName));
  }

  private getFormValue(formName: string) {
    switch (formName) {
      case 'basic':
        return this.basicForm.value;
      case 'validation':
        return this.validationForm.value;
      case 'customError':
        return this.customErrorForm.value;
      default:
        return {};
    }
  }
}
