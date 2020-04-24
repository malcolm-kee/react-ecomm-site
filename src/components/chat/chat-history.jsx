import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useId } from '../../hooks/use-id';
import { throttle } from '../../lib/fn-lib';
import styles from './chat-history.module.scss';

/**
 * `ChatHistory` should be the parent of `ChatMessage`.
 *
 * In addition of styling, `ChatHistory` will measure the scroll position everytime new child is appended,
 * and scroll to bottom if the scroll position is already at bottom.
 */
export const ChatHistory = ({
  height,
  className,
  children,
  tabIndex = 0,
  ...props
}) => {
  const divRef = React.useRef(null);
  /**
   * we store children in a state and render the children after setState.
   * Why? Because we want to measure the scroll position before the new child is appended
   */
  const [state, setState] = React.useState({
    children: null,
    isScrollAtBottom: true,
  });

  React.useLayoutEffect(() => {
    setState({
      children,
      isScrollAtBottom: getDiffToBottom(divRef.current) <= 5,
    });
  }, [children]);

  const childrenCount = React.Children.count(state.children);
  React.useEffect(() => {
    if (state.isScrollAtBottom) {
      scrollToBottom(divRef.current);
    }
  }, [state.isScrollAtBottom, childrenCount]);

  const [hasScrollSomeDistance, setHasScrollSomeDistance] = React.useState(
    false
  );

  const onScrollHandler = React.useCallback(
    throttle(() => {
      const container = divRef.current;
      if (container) {
        setHasScrollSomeDistance(
          getDiffToBottom(container) > container.clientHeight / 2
        );
      }
    }),
    []
  );

  const tempId = useId();

  return (
    <div className={styles.root}>
      <div
        {...props}
        tabIndex={tabIndex}
        style={{
          height,
        }}
        ref={divRef}
        className={cx(styles.history, className)}
        onScroll={onScrollHandler}
        data-testid="chat-history"
      >
        {state.children}
        {hasScrollSomeDistance && (
          <button
            onClick={() => {
              scrollToBottom(divRef.current);
              setHasScrollSomeDistance(false);
            }}
            className={styles.scrollToBottomBtn}
            aria-labelledby={tempId}
          >
            <DownIcon />
            <span className="sr-only" id={tempId}>
              Scroll to bottom
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

ChatHistory.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const getDiffToBottom = (element) => {
  return element.scrollHeight - (element.scrollTop + element.clientHeight);
};

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
};

const DownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 21"
    width="21"
    height="21"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#263238"
      fill-opacity=".33"
      d="M4.8 6.1l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"
    ></path>
  </svg>
);
