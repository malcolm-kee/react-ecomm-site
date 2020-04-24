import * as React from 'react';
import { getId } from '../lib/id';

/**
 * `useId` allows you to provide an id for your HTML element.
 */
export const useId = (providedId) => {
  const idRef = React.useRef(null);
  if (providedId) {
    return providedId;
  }
  if (!idRef.current) {
    idRef.current = getId();
  }
  return idRef.current;
};
