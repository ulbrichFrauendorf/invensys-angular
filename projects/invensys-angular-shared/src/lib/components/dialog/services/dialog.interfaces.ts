export interface DynamicDialogConfig {
  header?: string;
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
}
