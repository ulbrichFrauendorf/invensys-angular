import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IInputText } from '../input-text/input-text.component';

export interface SelectOption {
  value: any;
  label?: string;
  [key: string]: any;
}

@Component({
  selector: 'i-select',
  standalone: true,
  imports: [CommonModule, FormsModule, IInputText],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ISelect),
      multi: true,
    },
  ],
})
export class ISelect implements OnInit, OnChanges, ControlValueAccessor {
  @Input() label = 'Select';
  @Input() options: SelectOption[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() placeholder = 'Select an option';
  @Input() id?: string;
  @Input() fluid = false;
  @Input() showClear = false;
  @Input() filter = true;
  @Input() filterBy = 'label';
  @Input() errorMessages: { [key: string]: string } = {};

  @Output() onChange = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<void>();

  @ViewChild('inputText') inputTextRef!: IInputText;
  @ViewChild('dropdown', { static: false }) dropdownRef!: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef;

  isOpen = false;
  filterValue = '';
  filteredOptions: SelectOption[] = [];

  // This will be bound to the underlying input-text component
  get inputValue(): string {
    return this.getSelectedLabel() || '';
  }

  set inputValue(value: string) {
    // Read-only, but needed for ngModel binding
  }

  private _value: any = null;

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    // Update the underlying input-text component through ngModel
    if (this.inputTextRef) {
      this.inputTextRef.value = this.getSelectedLabel() || null;
    }
  }

  // ControlValueAccessor properties
  private onChangeCallback: (value: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  ngOnInit() {
    this.updateFilteredOptions();
  }

  ngOnChanges() {
    this.updateFilteredOptions();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.filterValue = '';
      this.updateFilteredOptions();
      setTimeout(() => {
        if (this.filter && this.searchInputRef) {
          this.searchInputRef.nativeElement.focus();
        }
      });
    }
  }

  selectOption(option: SelectOption) {
    const newValue = this.getOptionValue(option);
    this.value = newValue;
    this.onChange.emit(newValue);
    this.onChangeCallback(newValue); // Notify form control
    this.onTouchedCallback(); // Mark as touched
    this.isOpen = false;
    this.filterValue = '';
    this.updateFilteredOptions();
  }

  clearSelection() {
    this.value = null;
    this.onClear.emit();
    this.onChangeCallback(null); // Notify form control
    this.onTouchedCallback(); // Mark as touched
  }
  onFilterChange() {
    this.updateFilteredOptions();
  }

  updateFilteredOptions() {
    if (!this.filter || !this.filterValue.trim()) {
      this.filteredOptions = [...this.options];
    } else {
      const filterText = this.filterValue.toLowerCase();
      this.filteredOptions = this.options.filter((option) => {
        const searchValue = this.getOptionSearchValue(option).toLowerCase();
        return searchValue.includes(filterText);
      });
    }
  }

  getOptionLabel(option: SelectOption): string {
    return option[this.optionLabel] || option.label || String(option);
  }

  getOptionValue(option: SelectOption): any {
    return option[this.optionValue] || option.value || option;
  }

  getOptionSearchValue(option: SelectOption): string {
    if (this.filterBy && option[this.filterBy]) {
      return String(option[this.filterBy]);
    }
    return this.getOptionLabel(option);
  }

  getSelectedLabel(): string {
    if (this.value === null || this.value === undefined) {
      return '';
    }

    const selectedOption = this.options.find(
      (option) => this.getOptionValue(option) === this.value
    );

    return selectedOption
      ? this.getOptionLabel(selectedOption)
      : String(this.value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (
      this.dropdownRef &&
      !this.dropdownRef.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
      this.filterValue = '';
      this.updateFilteredOptions();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this._value = value;
    if (this.inputTextRef) {
      this.inputTextRef.value = this.getSelectedLabel() || null;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementation can be added if disabled state is needed
  }
}
