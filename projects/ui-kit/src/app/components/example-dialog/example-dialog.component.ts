import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from '../../../../../invensys-angular-shared/src/lib/components/dialog/services/dialog.interfaces';
import { IDialogActions } from '@shared/components/dialog/inner/dialog-actions/dialog-actions.component';
import { IInputText } from '@shared/components/input-text/input-text.component';

@Component({
  selector: 'app-example-dialog',
  imports: [ReactiveFormsModule, IDialogActions, IInputText],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
})
export class ExampleDialogComponent implements OnInit {
  public dialogRef?: DynamicDialogRef;
  public config: DynamicDialogConfig = {};
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      message: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Initialize form with data from config
    if (this.config.data) {
      this.form.patchValue({
        message: this.config.data.message || '',
        user: this.config.data.user || '',
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      // Close dialog and pass the form data as result
      this.dialogRef?.close(formData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onHide() {
    this.dialogRef?.close();
  }
}
