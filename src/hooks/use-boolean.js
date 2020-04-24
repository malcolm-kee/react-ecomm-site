import * as React from 'react';

/**
 * a simple custom hooks.
 *
 * The code is so simple that you better be use the state hook directly.
 */
export const useBoolean = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((val) => !val);
  }, []);
  return [value, toggle, setValue];
};
