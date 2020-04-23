import React from 'react';

export const useLatest = (value) => {
  const valueRef = React.useRef(value);
  valueRef.current = value;
  return valueRef;
};
