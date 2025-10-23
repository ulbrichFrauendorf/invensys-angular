import { AbstractDialog } from '../dialog-base';

export interface DynamicDialogConfig {
  header?: string;
  message?: string;
  width?: string;
  height?: string;
  contentStyle?: { [key: string]: any };
  breakpoints?: { [key: string]: string };
  closable?: boolean;
  modal?: boolean;
  data?: any;
}

export interface DynamicDialogRef {
  close(result?: any): void;
  onClose: Promise<any>;
  instance?: AbstractDialog;
}
