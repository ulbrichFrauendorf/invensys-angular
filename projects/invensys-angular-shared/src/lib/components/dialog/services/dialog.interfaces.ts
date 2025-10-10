export interface DynamicDialogConfig {
  header?: string;
  message?: string;
  width?: string;
  height?: string;
  submitLabel?: string;
  cancelLabel?: string;
  contentStyle?: { [key: string]: any };
  breakpoints?: { [key: string]: string };
  closable?: boolean;
  modal?: boolean;
  data?: any;
}

export interface DynamicDialogRef {
  close(result?: any): void;
  onClose: Promise<any>;
  instance?: any;
}
