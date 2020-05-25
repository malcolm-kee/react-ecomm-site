import * as React from 'react';

export type FieldContextType = {
  inputId: string | undefined;
  setInputId: (val: string) => void;
};

const DEFAULT_CONTEXT: FieldContextType = {
  inputId: undefined,
  setInputId: function noop() {},
};

export const FieldContext = React.createContext<FieldContextType>(
  DEFAULT_CONTEXT
);
