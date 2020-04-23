import React from 'react';

export const useLazyRef = (valueGetter) => {
  const ref = React.useRef(null);
  if (!ref.current) {
    ref.current = valueGetter();
  }
  return ref;
};
