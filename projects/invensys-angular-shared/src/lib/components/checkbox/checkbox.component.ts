import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

@Component({
  selector: 'i-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ICheckbox),
      multi: true,
    },
  ],
})
export class ICheckbox implements ControlValueAccessor {
  @Input() label?: string;
  @Input() id?: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = !!value;
  }

  @Output() onChange = new EventEmitter<boolean>();

  componentId = UniqueComponentId('i-checkbox');

  private _checked = false;
  private onChangeCallback: (value: boolean) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  toggle() {
    if (this.disabled || this.readonly) return;

    this.checked = !this.checked;
    this.onChange.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this._checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
