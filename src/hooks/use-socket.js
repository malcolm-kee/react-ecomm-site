import React from 'react';
import { useLatest } from './use-latest';

export const useSocket = (endpoint, { onMessage, onOpen, onError }) => {
  const [status, setStatus] = React.useState('initializing');
  const onMessageRef = useLatest(onMessage);
  const onOpenRef = useLatest(onOpen);
  const onErrorRef = useLatest(onError);
  const wsRef = React.useRef(null);
  React.useEffect(() => {
    setStatus('initializing');
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;
    ws.onopen = function onSocketOpen(ev) {
      setStatus('connected');
      if (onOpenRef.current) {
        onOpenRef.current(ev);
      }
    };
    ws.onerror = function onSocketError(ev) {
      setStatus('error');
      if (onErrorRef.current) {
        onErrorRef.current(ev);
      }
    };
    ws.onmessage = function onSocketMessage(event) {
      const data = JSON.parse(event.data);
      onMessageRef.current(data);
    };
    return () => {
      ws.close();
    };
  }, [endpoint, onMessageRef, onOpenRef, onErrorRef]);

  const send = React.useCallback(function sendMessage(data) {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return [status, send];
};
