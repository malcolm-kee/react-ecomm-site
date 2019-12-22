import * as React from 'react';
import { useSocket } from '../../hooks/use-socket';
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
  const [status, send] = useSocket(props.socketEndpoint, {
    onMessage: data => setMessages(msgs => msgs.concat(data)),
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
            <ChatSystemMessage key={i}>{message.message}</ChatSystemMessage>
          ) : (
            <ChatMessage
              message={message.message}
              sendTime={message.displayedDate}
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

type Message = {
  type: 'User' | 'System';
  userName: string;
  userId: number;
  message: string;
  displayedDate: string;
};
