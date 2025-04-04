/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  Type,
  TemplateRef,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'i-crud-data-list',
    templateUrl: './crud-data-list.component.html',
    styleUrl: './crud-data-list.component.scss',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
    ],
    providers: [DialogService]
})
export class CrudDataListComponent<T> {
  @ViewChild('dataTable', { static: false })
  dataTable!: Table;

  @ViewChildren('dataRow') dataRows!: QueryList<any>;

  @Input() data$!: Observable<T[]>;
  @Input() addNewdialogComponent?: Type<any>;
  @Input() addNewDialogHeader: string = 'Add New';
  @Input() addNewButtonText: string = 'Add New';
  @Input() expansionComponent?: Type<any>;

  expandeddata: { [key: string]: boolean } = {};
  searchValue: string | undefined;

  constructor(private dialogService: DialogService) {}

  onRowExpand(event: any) {
    const data = event.data;
    this.expandeddata = {};
    this.expandeddata[data.id] = true;
    this.scrollToRow(data.id);
  }

  scrollToRow(id: string) {
    setTimeout(() => {
      const rowElement = this.dataRows.find(
        (row) => row.nativeElement.getAttribute('data-id') === id
      );

      if (rowElement) {
        const opt: ScrollToOptions = {
          top: rowElement.nativeElement.offsetTop,
        };
        this.dataTable.scrollTo(opt);
      }
    }, 0);
  }

  ref: DynamicDialogRef | undefined;

  displayDialog() {
    console.log('displayDialog');
    if (this.addNewdialogComponent) {
      this.ref = this.dialogService.open(this.addNewdialogComponent, {
        header: this.addNewDialogHeader,
        width: '50rem',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
      });
    }
  }
}
