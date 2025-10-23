import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  forwardRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IChip } from '../chip/chip.component';

@Component({
  selector: 'i-chips',
  standalone: true,
  imports: [CommonModule, FormsModule, IChip],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IChips),
      multi: true,
    },
  ],
})
export class IChips implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Enter text and press Enter to add';
  @Input() max?: number;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() removable = true;
  @Input() allowDuplicates = false;
  @Input() separator?: string | RegExp = ',';
  @Input() addOnBlur = false;
  @Input() addOnTab = true;
  @Input() styleClass?: string;
  @Input() chipStyleClass?: string;

  @Output() onAdd = new EventEmitter<{ originalEvent: Event; value: string }>();
  @Output() onRemove = new EventEmitter<{
    originalEvent: Event;
    value: string;
  }>();
  @Output() onChipClick = new EventEmitter<{
    originalEvent: Event;
    value: string;
  }>();

  @ViewChild('inputElement') inputElementRef!: ElementRef<HTMLInputElement>;

  inputValue = '';
  values: string[] = [];
  focused = false;

  private onChangeCallback: (value: string[]) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  ngOnInit() {
    // Initialize
  }

  writeValue(value: string[]): void {
    this.values = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'Enter':
        this.addChip(event);
        break;
      case 'Tab':
        if (this.addOnTab) {
          this.addChip(event);
        }
        break;
      case 'Backspace':
        if (!this.inputValue && this.values.length > 0) {
          this.removeChip(this.values.length - 1, event);
        }
        break;
    }
  }

  onInputBlur(event: FocusEvent) {
    this.focused = false;
    this.onTouchedCallback();

    if (this.addOnBlur) {
      this.addChip(event);
    }
  }

  onInputFocus(event: FocusEvent) {
    this.focused = true;
  }

  onInputPaste(event: ClipboardEvent) {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';

    if (this.separator) {
      const values = pastedText.split(this.separator);
      values.forEach((value) => {
        const trimmedValue = value.trim();
        if (trimmedValue) {
          this.addValue(trimmedValue, event);
        }
      });
    } else {
      this.addValue(pastedText.trim(), event);
    }
  }

  addChip(event: Event) {
    const value = this.inputValue.trim();
    if (value) {
      this.addValue(value, event);
      this.inputValue = '';
    }
  }

  addValue(value: string, event: Event) {
    if (this.max && this.values.length >= this.max) return;
    if (!this.allowDuplicates && this.values.includes(value)) return;

    this.values = [...this.values, value];
    this.onAdd.emit({ originalEvent: event, value });
    this.onChangeCallback(this.values);
  }

  removeChip(index: number, event: Event) {
    if (this.disabled || this.readonly) return;

    event.stopPropagation();
    const removedValue = this.values[index];
    this.values = this.values.filter((_, i) => i !== index);
    this.onRemove.emit({ originalEvent: event, value: removedValue });
    this.onChangeCallback(this.values);
  }

  onChipClickHandler(value: string, event: Event) {
    this.onChipClick.emit({ originalEvent: event, value });
  }

  focusInput() {
    if (this.inputElementRef) {
      this.inputElementRef.nativeElement.focus();
    }
  }

  @HostListener('click', ['$event'])
  onContainerClick(event: Event) {
    if (!this.disabled && !this.readonly) {
      this.focusInput();
    }
  }
}
