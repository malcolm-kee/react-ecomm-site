/// <reference types="react-scripts" />

type DatePickOption = {
  dateFormat?: string;
  onSelect?: (dates: Date[]) => void;
  pickerClass?: string;
  showAnim?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface JQuery {
  datepick(command: 'getDate'): Date[];
  datepick(command: 'setDate', date: string | Date): JQuery;
  datepick(command: 'clear'): JQuery;
  datepick(command: 'show'): JQuery;
  datepick(command: 'destroy'): JQuery;
  datepick(options?: DatePickOption): any;
}

declare interface JQueryStatic {
  datepick: {
    formatDate: (format: string, date: Date) => string;
  };
}

declare module 'react-helmet' {
  import * as React from 'react';

  export interface HelmetTags {
    baseTag: Array<any>;
    linkTags: Array<HTMLLinkElement>;
    metaTags: Array<HTMLMetaElement>;
    noscriptTags: Array<any>;
    scriptTags: Array<HTMLScriptElement>;
    styleTags: Array<HTMLStyleElement>;
  }

  export interface HelmetData {
    base: HelmetDatum;
    bodyAttributes: HelmetHTMLBodyDatum;
    htmlAttributes: HelmetHTMLElementDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    noscript: HelmetDatum;
    script: HelmetDatum;
    style: HelmetDatum;
    title: HelmetDatum;
    titleAttributes: HelmetDatum;
  }

  export interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any>;
  }

  export interface HelmetProps {
    async?: boolean;
    base?: any;
    bodyAttributes?: BodyProps;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: HtmlProps;
    onChangeClientState?: (
      newState: any,
      addedTags: HelmetTags,
      removedTags: HelmetTags
    ) => void;
    link?: LinkProps[];
    meta?: MetaProps[];
    noscript?: Array<any>;
    script?: Array<any>;
    style?: Array<any>;
    title?: string;
    titleAttributes?: Object;
    titleTemplate?: string;
    children?: React.ReactNode;
  }

  export class Helmet extends React.Component<HelmetProps> {
    static peek(): HelmetData;
    static rewind(): HelmetData;
    static renderStatic(): HelmetData;
    static canUseDOM: boolean;
  }
}

declare module 'history' {
  export function createMemoryHistory(options: any): any;
}
