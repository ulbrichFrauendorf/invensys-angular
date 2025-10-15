import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IInputText } from '../../../../../invensys-angular-shared/src/lib/components/input-text/input-text.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-input-texts',
  imports: [IInputText, ReactiveFormsModule, CodeDisplayComponent],
  templateUrl: './input-texts.component.html',
  styleUrl: './input-texts.component.scss',
})
export class InputTextsComponent implements OnInit {
  basicForm: FormGroup;
  validationForm: FormGroup;
  customErrorForm: FormGroup;
  fluidForm: FormGroup;

  // Source code strings for each input section
  textInputCode = `<i-input-text label="Text Input" type="text" id="text-input" formControlName="textInput"></i-input-text>`;

  emailInputCode = `<i-input-text label="Email Input" type="email" id="email-input" formControlName="emailInput"></i-input-text>`;

  requiredFieldCode = `<i-input-text label="Required Field" type="text" id="required-field" formControlName="requiredField"></i-input-text>`;

  minLengthFieldCode = `<i-input-text label="Min Length (5 chars)" type="text" id="minlength-field" formControlName="minLengthField"></i-input-text>`;

  usernameFieldCode = `<i-input-text label="Username" type="text" id="username-field" formControlName="usernameField" [errorMessages]="usernameErrors"></i-input-text>`;

  phoneFieldCode = `<i-input-text label="Phone Number" type="tel" id="phone-field" formControlName="phoneField" [errorMessages]="phoneErrors"></i-input-text>`;

  fluidInputsCode = `<i-input-text label="Fluid Text Input" type="text" id="fluid-text" formControlName="fluidText" [fluid]="true"></i-input-text>
<i-input-text label="Fluid Email Input" type="email" id="fluid-email" formControlName="fluidEmail" [fluid]="true"></i-input-text>
<i-input-text label="Fluid Password Input" type="password" id="fluid-password" formControlName="fluidPassword" [fluid]="true"></i-input-text>`;

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

    this.fluidForm = this.fb.group({
      fluidText: [''],
      fluidEmail: [''],
      fluidPassword: [''],
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
      case 'fluid':
        return this.fluidForm.value;
      default:
        return {};
    }
  }
}
