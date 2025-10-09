import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

export type IButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'contrast';
export type IButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'i-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class IButton implements AfterViewInit {
  @Input() severity: IButtonSeverity = 'primary';
  @Input() size: IButtonSize = 'small';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() outlined = false;
  @Input() raised = false;
  @Input() text = false;
  @Input() icon?: string;
  @Input() fluid = false;
  @Output() clicked = new EventEmitter<Event>();
  @ViewChild('projected', { read: ElementRef })
  projected?: ElementRef<HTMLElement>;
  iconOnly = false;

  componentId = UniqueComponentId('i-button-');

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    var text = this.projected?.nativeElement?.textContent;
    const hasProjected = text && text.trim()?.length > 0;
    this.iconOnly = !!this.icon && !hasProjected;
    // Trigger change detection to ensure CSS classes are applied correctly
    this.cdr.detectChanges();
  }
}
