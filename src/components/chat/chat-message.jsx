import cx from 'classnames';
import React from 'react';
import styles from './chat-message.module.scss';

export const ChatMessage = ({ message, sendTime, sender, isMe }) => {
  return (
    <div className={cx(styles.root, isMe && styles.rootIsMe)}>
      <div className={cx(styles.msg, isMe && styles.msgIsMe)}>
        <span className={cx(styles.tail, isMe && styles.tailIsMe)} />
        {sender && <div className={styles.sender}>{sender}</div>}
        <div className={styles.msgContent}>
          {message}
          <span className={styles.padEnd}></span>
        </div>
        <div className={styles.time}>
          <small>{sendTime}</small>
        </div>
      </div>
    </div>
  );
};
