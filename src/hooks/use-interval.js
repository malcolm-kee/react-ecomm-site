import React from 'react';

/**
 * `useInterval` is based on [Dan Abromov's blog](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
 * with additional ability to reset the interval
 * @param {() => void} callback the callback you want to invoke for each interval
 * @param {number | null} delay pass down `null` to pause the interval
 * @return {() => void} function to reset the current interval
 */
export function useInterval(callback, delay) {
  const savedCallback = React.useRef();
  const [resetCount, setResetCount] = React.useState(0);

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, resetCount]);

  return function reset() {
    setResetCount(lastCount => lastCount + 1);
  };
}
