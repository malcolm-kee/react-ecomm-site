import * as React from 'react';

const DEFAULT_CONTEXT = {
  inputId: undefined,
  setInputId: function noop() {},
};

export const FieldContext = React.createContext(DEFAULT_CONTEXT);
