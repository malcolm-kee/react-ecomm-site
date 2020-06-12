import cx from 'classnames';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import * as React from 'react';
import styles from './chat-message.module.scss';

export const ChatMessage = (props) => {
  return (
    <div className={cx(styles.root, props.isMe && 'text-right')}>
      <div
        className={cx(
          'px-3 py-2 inline-block relative shadow-md mb-3',
          styles.msg,
          props.isMe ? 'bg-teal-100' : 'bg-gray-100'
        )}
      >
        <span className={cx(styles.tail, props.isMe && styles.tailIsMe)} />
        {props.sender && (
          <div className="text-teal-800 font-bold text-sm">{props.sender}</div>
        )}
        <div className="text-left whitespace-pre-wrap relative">
          {props.message}
          <span className={styles.padEnd}></span>
        </div>
        <div className={styles.time}>
          <small>{props.sendTime && format(props.sendTime, 'HH:mm')}</small>
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.node.isRequired,
  sendTime: PropTypes.string.isRequired,
  sender: PropTypes.node,
  isMe: PropTypes.bool,
};
