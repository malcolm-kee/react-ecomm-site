import React from 'react';
import { throttle } from '../lib/fn-lib';

export function useWindowEvent(
  eventType,
  callback,
  { wait = 0, deps = [] } = {}
) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const onWindowEvent = throttle(function onWindowEventImpl(ev) {
      savedCallback.current && savedCallback.current(ev);
    }, wait);

    window.addEventListener(eventType, onWindowEvent);

    return function unsubWindowEvent() {
      window.removeEventListener(eventType, onWindowEvent);
    };
  }, deps);
}
