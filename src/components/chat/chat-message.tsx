import cx from 'classnames';
import * as React from 'react';
import styles from './chat-message.module.scss';

export type ChatMessageProps = {
  message: React.ReactNode;
  sendTime: string;
  sender?: React.ReactNode;
  isMe?: boolean;
};

export const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div className={cx(styles.root, props.isMe && styles.rootIsMe)}>
      <div className={cx(styles.msg, props.isMe && styles.msgIsMe)}>
        <span className={cx(styles.tail, props.isMe && styles.tailIsMe)} />
        {props.sender && <div className={styles.sender}>{props.sender}</div>}
        <div className={styles.msgContent}>
          {props.message}
          <span className={styles.padEnd}></span>
        </div>
        <div className={styles.time}>
          <small>{props.sendTime}</small>
        </div>
      </div>
    </div>
  );
};
