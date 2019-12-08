import * as React from 'react';
import { getId } from '../lib/id';

/**
 * `useId` allows you to provide an id for your HTML element.
 */
export const useId = (providedId: string | undefined): string => {
  const idRef = React.useRef<string | null>(null);
  if (providedId) {
    return providedId;
  }
  if (!idRef.current) {
    idRef.current = getId();
  }
  return idRef.current;
};
