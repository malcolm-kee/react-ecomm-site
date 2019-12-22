import * as React from 'react';
import { useLatest } from '../../hooks/use-latest';
import { Alert } from '../alert';
import { Spinner } from '../spinner';
import styles from './chat-box.module.scss';
import { ChatHistory } from './chat-history';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { ChatSystemMessage } from './chat-system-message';

type ChatBoxProps = {
  socketEndpoint: string;
  userId: number;
  height?: number;
};

export const ChatBox = ({ height = 400, ...props }: ChatBoxProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [status, send] = useSocket(props.socketEndpoint, data => {
    setMessages(msgs => msgs.concat(data));
  });

  return (
    <div className={styles.root}>
      {status === 'initializing' ? (
        <Spinner className={styles.spinner} />
      ) : status === 'error' ? (
        <Alert color="danger">Fail to connect. Please try again</Alert>
      ) : null}
      <ChatHistory height={height}>
        {messages.map((message, i) => {
          const isMe = message.userId === props.userId;
          return message.type === 'System' ? (
            <ChatSystemMessage>{message.message}</ChatSystemMessage>
          ) : (
            <ChatMessage
              message={message.message}
              sendTime="12/12/12"
              sender={isMe ? undefined : message.userName}
              isMe={isMe}
              key={i}
            />
          );
        })}
      </ChatHistory>
      <ChatInput
        onSend={message => {
          send({
            userId: props.userId,
            message,
          });
        }}
        disabled={status !== 'connected'}
      />
    </div>
  );
};

const useSocket = (endpoint: string, onMessage: (data: any) => void) => {
  const [status, setStatus] = React.useState<ConnectionStatus>('initializing');
  const onMessageRef = useLatest(onMessage);
  const wsRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    setStatus('initializing');
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;
    ws.onopen = function() {
      setStatus('connected');
    };
    ws.onerror = function() {
      setStatus('error');
    };
    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      onMessageRef.current(data);
    };
  }, [endpoint, onMessageRef]);

  const send = React.useCallback(function sendMessage(data: any) {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return [status, send] as const;
};

type ConnectionStatus = 'initializing' | 'connected' | 'error';

type Message = {
  type: 'User' | 'System';
  userName: string;
  userId: number;
  message: string;
};
