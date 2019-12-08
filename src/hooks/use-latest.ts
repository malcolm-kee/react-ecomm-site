import * as React from 'react';

export const useLatest = <T>(value: T) => {
  const valueRef = React.useRef(value);
  valueRef.current = value;
  return valueRef;
};
