import cx from 'classnames';
import * as React from 'react';
import styles from './chat-system-message.module.scss';

export const ChatSystemMessage = (props) => (
  <div className={styles.root}>
    <div {...props} className={cx(styles.message, props.className)} />
  </div>
);
