import cx from 'classnames';
import * as React from 'react';
import { Textarea, TextareaProps } from '../textarea';
import { callAll } from '../../lib/fn-lib';
import { useId } from '../../hooks/use-id';
import styles from './chat-input.module.scss';

export type ChatInputProps = Omit<TextareaProps, 'ref'> & {
  onSend: (msg: string) => void;
  /**
   * should the value be cleared when message is sent. This only works if you don't control the `value` props.
   */
  clearOnSend?: boolean;
};

export const ChatInput = ({
  onSend,
  clearOnSend = true,
  className,
  ...props
}: ChatInputProps) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const ensuredId = useId(props.id);
  const handleSend = () => {
    const inputValue = inputRef.current!.value.trim();
    if (inputValue) {
      onSend(inputValue);
      if (clearOnSend) {
        inputRef.current!.value = '';
      }
    }
  };

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        handleSend();
      }}
      className={styles.root}
    >
      <Textarea
        required
        aria-describedby={`${ensuredId}-label`}
        className={cx(styles.textarea, className)}
        minRows={1}
        useCacheForDOMMeasurements
        {...props}
        onKeyDown={callAll(ev => {
          if (ev.keyCode === 13 && !ev.shiftKey) {
            ev.preventDefault();
            handleSend();
          }
        }, props.onKeyDown)}
        ref={inputRef}
      />
      <span hidden id={`${ensuredId}-label`}>
        Chat message
      </span>
      <button
        onClick={() => {
          inputRef.current!.focus();
        }}
        className={styles.btn}
        type="submit"
      >
        <SendIcon />
        <span className="sr-only">Send</span>
      </button>
    </form>
  );
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
