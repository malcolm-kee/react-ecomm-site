import * as React from 'react';
import { throttle } from '../lib/fn-lib';
import { useCallbackProp } from './use-callback-props';

export function useWindowEvent<EventType extends keyof WindowEventMap>(
  eventType: EventType,
  callback: (ev: WindowEventMap[EventType]) => any,
  { wait = 0 } = {}
) {
  const savedCallback = useCallbackProp(callback);

  React.useEffect(() => {
    const onWindowEvent = throttle(savedCallback, wait);

    window.addEventListener(eventType, onWindowEvent);

    return function unsubWindowEvent() {
      window.removeEventListener(eventType, onWindowEvent);
    };
  }, [wait, eventType, savedCallback]);
}
