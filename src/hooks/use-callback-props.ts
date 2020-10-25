import { useCallback, useEffect, useRef } from 'react';

export function useCallbackProp<F extends Function>(callback: F | undefined) {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  });
  return (useCallback(
    (...args: any[]) => ref.current && ref.current(...args),
    []
  ) as unknown) as F;
}
