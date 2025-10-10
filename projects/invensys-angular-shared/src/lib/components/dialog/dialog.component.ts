import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICard } from '../card/card.component';
import { IDialogActions } from './inner/dialog-actions/dialog-actions.component';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

@Component({
  selector: 'i-dialog',
  imports: [CommonModule, ICard, IDialogActions],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class IDialog implements OnInit, OnDestroy {
  @Input() header?: string;
  @Input() width: string = '50rem';
  @Input() height?: string;
  @Input() closable: boolean = true;
  @Input() modal: boolean = true;
  @Input() contentStyle?: { [key: string]: any };
  @Input() breakpoints?: { [key: string]: string };
  @Input() visible: boolean = false;
  @Input() submitLabel = 'Submit';
  @Input() cancelLabel = 'Cancel';

  @Output() submitEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();

  @ViewChild('dialogElement', { static: false }) dialogElement?: ElementRef;

  componentId = UniqueComponentId('i-dialog-');

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.visible) {
      this.show();
    }
  }

  ngOnDestroy() {
    this.hide();
  }

  show() {
    this.visible = true;
    this.visibleChange.emit(true);
    this.onShow.emit();
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  hide() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHide.emit();
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.closable && this.visible) {
      this.hide();
    }
  }

  onOverlayClick(event: Event) {
    if (this.modal && event.target === event.currentTarget && this.closable) {
      this.hide();
    }
  }

  onCloseClick() {
    if (this.closable) {
      this.hide();
    }
  }

  onCancel() {
    this.cancelEvent.emit();
  }

  onSubmit() {
    this.submitEvent.emit();
  }
}
