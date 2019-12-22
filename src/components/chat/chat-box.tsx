import * as React from 'react';
import { ChatInput } from './chat-input';
import { ChatHistory } from './chat-history';
import { ChatMessage } from './chat-message';
import { Spinner } from '../spinner';
import { Alert } from '../alert';
import styles from './chat-box.module.scss';

type ChatBoxProps = {
  socketEndpoint: string;
  userName: string;
};

export const ChatBox = (props: ChatBoxProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const [status, setStatus] = React.useState<ConnectionStatus>('initializing');
  const wsRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    setStatus('initializing');
    const ws = new WebSocket(props.socketEndpoint);
    wsRef.current = ws;
    ws.onopen = function() {
      setStatus('connected');
    };
    ws.onerror = function() {
      setStatus('error');
    };
    ws.onmessage = function(event) {
      const incomingMessage = JSON.parse(event.data);
      setMessages(msgs => msgs.concat(incomingMessage));
    };
  }, [props.socketEndpoint]);

  return (
    <div className={styles.root}>
      {status === 'initializing' ? (
        <Spinner className={styles.spinner} />
      ) : status === 'error' ? (
        <Alert color="danger">Fail to connect. Please try again</Alert>
      ) : null}
      <ChatHistory height={300}>
        {messages.map((message, i) => (
          <ChatMessage
            message={message.msg}
            sendTime="12/12/12"
            sender={message.userName}
            key={i}
          />
        ))}
      </ChatHistory>
      <ChatInput
        onSend={msg => {
          if (wsRef.current) {
            wsRef.current.send(
              JSON.stringify({
                userName: props.userName,
                msg,
              })
            );
          }
        }}
        disabled={status !== 'connected'}
      />
    </div>
  );
};

type ConnectionStatus = 'initializing' | 'connected' | 'error';

type Message = {
  userName: string;
  msg: string;
};
