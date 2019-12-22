import cx from 'classnames';
import * as React from 'react';
import styles from './chat-system-message.module.scss';

export type ChatSystemMessageProps = JSX.IntrinsicElements['div'];

export const ChatSystemMessage = (props: ChatSystemMessageProps) => (
  <div className={styles.root}>
    <div {...props} className={cx(styles.message, props.className)} />
  </div>
);
