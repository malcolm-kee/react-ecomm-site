/// <reference types="react-scripts" />

declare namespace React {
  interface ImgHTMLAttributes {
    loading?: 'lazy' | 'eager' | 'auto';
  }
}

type DatePickOption = {
  dateFormat?: string;
  onSelect?: (dates: Date[]) => void;
};

declare interface JQuery {
  datepick(command: 'getDate'): Date[];
  datepick(command: 'setDate', date: string | Date): JQuery;
  datepick(command: 'clear'): JQuery;
  datepick(options?: DatePickOption): any;
}

declare interface JQueryStatic {
  datepick: {
    formatDate: (format: string, date: Date) => string;
  };
}
