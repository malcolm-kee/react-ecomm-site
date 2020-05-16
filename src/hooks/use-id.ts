import * as React from 'react';
import { getId } from '../lib/id';

/**
 * `useId` allows you to provide an id for your HTML element.
 */
export const useId = (providedId?: string | undefined): string | undefined => {
  const [id, setId] = React.useState<string | undefined>(providedId);
  React.useEffect(() => {
    if (!id) {
      setId(getId());
    }
  }, [id]);
  return id || providedId;
};
