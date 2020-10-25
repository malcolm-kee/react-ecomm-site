import * as React from 'react';
import { useCallbackProp } from './use-callback-props';

type UseSocketOptions = {
  onMessage: (data: any) => void;
  onOpen?: (ev: Event) => void;
  onError?: (ev: Event) => void;
};

type ConnectionStatus = 'initializing' | 'connected' | 'error';

export const useSocket = (
  endpoint: string | null,
  { onMessage, onOpen, onError }: UseSocketOptions
) => {
  const [status, setStatus] = React.useState<ConnectionStatus>('initializing');
  const onMessageCb = useCallbackProp(onMessage);
  const onOpenCb = useCallbackProp(onOpen);
  const onErrorCb = useCallbackProp(onError);
  const wsRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    if (endpoint) {
      setStatus('initializing');
      const ws = new WebSocket(endpoint);
      wsRef.current = ws;
      ws.onopen = function onSocketOpen(ev) {
        setStatus('connected');
        onOpenCb(ev);
      };
      ws.onerror = function onSocketError(ev) {
        setStatus('error');
        onErrorCb(ev);
      };
      ws.onmessage = function onSocketMessage(event) {
        const data = JSON.parse(event.data);
        onMessageCb(data);
      };
      return () => {
        ws.close();
      };
    }
  }, [endpoint, onMessageCb, onOpenCb, onErrorCb]);

  const send = React.useCallback(function sendMessage(data: any) {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return [status, send] as const;
};
