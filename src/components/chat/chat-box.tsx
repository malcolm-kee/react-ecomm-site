import * as React from 'react';
import { useSocket } from '../../hooks/use-socket';
import { Alert } from '../alert';
import { Spinner } from '../spinner';
import styles from './chat-box.module.scss';
import { ChatHistory } from './chat-history';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { ChatSystemMessage } from './chat-system-message';
import { useGlobalChatRoom } from './chat.queries';

type ChatBoxProps = {
  socketEndpoint: string;
  userId: string;
  height?: number;
};

export const ChatBox = ({
  height = 400,
  socketEndpoint,
  userId,
}: ChatBoxProps) => {
  const globalChat = useGlobalChatRoom();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [status, send] = useSocket(
    globalChat.data ? `${socketEndpoint}?roomId=${globalChat.data._id}` : null,
    {
      onMessage: (data: Message) => {
        setMessages((msgs) => msgs.concat(data));
        if (data.type === 'System') {
          globalChat.refetch({
            force: true,
          });
        }
      },
    }
  );

  return (
    <div className={styles.root}>
      {status === 'initializing' ? (
        <Spinner className={styles.spinner} />
      ) : status === 'error' ? (
        <Alert color="danger">Fail to connect. Please try again</Alert>
      ) : null}
      <ChatHistory height={height}>
        {messages.map((message, i) => {
          if (message.type === 'System') {
            return (
              <ChatSystemMessage key={i}>{message.message}</ChatSystemMessage>
            );
          }

          const isMe = message.data.senderId === userId;
          const sender = isMe
            ? undefined
            : globalChat.data!.participants.find(
                (p) => p._id === message.data.senderId
              );

          return (
            <ChatMessage
              message={message.message}
              sendTime={message.data.createdAt}
              sender={sender && sender.name}
              isMe={isMe}
              key={i}
            />
          );
        })}
      </ChatHistory>
      <ChatInput
        onSend={(message) => {
          send({
            senderId: userId,
            content: message,
          });
        }}
        disabled={status !== 'connected'}
      />
    </div>
  );
};

type Message =
  | {
      type: 'System';
      message: string;
    }
  | {
      type: 'User';
      message: string;
      data: {
        content: string;
        senderId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
