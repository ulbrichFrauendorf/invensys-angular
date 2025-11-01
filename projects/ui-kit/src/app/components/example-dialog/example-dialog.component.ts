import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IDialogBase } from '@shared/components/dialog/base-dialog.component';
import { IDialogActions } from '@shared/components/dialog/inner/dialog-actions/dialog-actions.component';
import { IInputText } from '@shared/components/input-text/input-text.component';

@Component({
  selector: 'app-example-dialog',
  imports: [ReactiveFormsModule, IDialogActions, IInputText],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
})
export class ExampleDialogComponent extends IDialogBase implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      message: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  override ngOnInit() {
    super.ngOnInit();

    // Initialize form with data from config
    const data = this.getData();
    if (data) {
      this.form.patchValue({
        message: data.message || '',
        user: data.user || '',
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      // Close dialog and pass the form data as result
      this.close(formData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onHide() {
    this.close();
  }
}
