import React from 'react';

let id = Date.now();

const getId = () => `component-${id++}`;

/**
 * useId will assign a unique id for a React component and will not change
 * throughout the component lifecycle.
 *
 * Note that on initial render, the returned value will be null
 */
export function useId() {
  const idRef = React.useRef(null);

  React.useEffect(() => {
    idRef.current = getId();
  }, []);

  return idRef.current;
}
