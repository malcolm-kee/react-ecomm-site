import React from 'react';
import { throttle } from '../lib/fn-lib';

export function useWindowEvent<EventType extends keyof WindowEventMap>(
  eventType: EventType,
  callback: (ev: WindowEventMap[EventType]) => any,
  { wait = 0, deps = [] } = {}
) {
  const savedCallback = React.useRef<null | typeof callback>(null);

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
    // eslint-disable-next-line
  }, deps);
}
