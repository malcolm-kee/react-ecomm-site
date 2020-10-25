import * as React from 'react';
import { useCallbackProp } from './use-callback-props';

/**
 * `useInterval` is based on [Dan Abromov's blog](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
 * with additional ability to reset the interval
 * @param callback the callback you want to invoke for each interval
 * @param delay pass down `null` to pause the interval
 * @return function to reset the current interval
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useCallbackProp(callback);
  const [resetCount, setResetCount] = React.useState(0);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, resetCount, savedCallback]);

  return function reset() {
    setResetCount((lastCount) => lastCount + 1);
  };
}
