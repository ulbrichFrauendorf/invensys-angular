import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

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
  /** native button type: 'button' | 'submit' | 'reset' */
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

  ngAfterViewInit(): void {
    var text = this.projected?.nativeElement?.textContent;
    const hasProjected = text && text.trim()?.length > 0;
    this.iconOnly = !!this.icon && !hasProjected;
  }
}
