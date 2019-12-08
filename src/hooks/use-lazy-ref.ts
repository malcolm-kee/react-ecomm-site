import * as React from 'react';

export const useLazyRef = <T>(valueGetter: () => T) => {
  const ref = React.useRef<T | null>(null);
  if (!ref.current) {
    ref.current = valueGetter();
  }
  return ref as React.MutableRefObject<T>;
};
