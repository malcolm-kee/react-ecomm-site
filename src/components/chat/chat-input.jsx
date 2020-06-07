import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useId } from '../../hooks/use-id';
import { callAll } from '../../lib/fn-lib';
import { Textarea } from '../textarea';
import styles from './chat-input.module.scss';

export const ChatInput = ({
  onSend,
  clearOnSend = true,
  className,
  placeholder = 'Type a message',
  ...props
}) => {
  const inputRef = React.useRef(null);
  const ensuredId = useId(props.id);
  const handleSend = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue) {
      onSend(inputValue);
      if (clearOnSend) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSend();
      }}
      className={styles.root}
    >
      <div className={styles.inputWrapper}>
        <Textarea
          required
          aria-labelledby={`${ensuredId}-label`}
          className={cx(styles.textarea, className)}
          minRows={1}
          cacheMeasurements
          placeholder={placeholder}
          {...props}
          onKeyDown={callAll((ev) => {
            if (ev.keyCode === 13 && !ev.shiftKey) {
              ev.preventDefault();
              handleSend();
            }
          }, props.onKeyDown)}
          ref={inputRef}
        />
        <label className="sr-only" id={`${ensuredId}-label`}>
          Chat message
        </label>
        <button
          onClick={() => {
            inputRef.current.focus();
          }}
          className={styles.btn}
          type="submit"
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  /**
   * should the value be cleared when message is sent. This only works if you don't control the `value` props.
   */
  clearOnSend: PropTypes.bool,
};

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
    aria-hidden="true"
    focusable="false"
  >
    <g fill="#2fa4e7">
      <path d="M12 1v15.97l-1 1.12-8.6 1.82a1 1 0 0 1-1.3-1.36l9-18A.99.99 0 0 1 11 0l1 1z" />
      <path d="M11 0c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L11 18.1V0z" />
    </g>
  </svg>
);
