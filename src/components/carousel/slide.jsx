import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './slide.module.scss';

const toRightTransitions = {
  enter: `${styles.item} ${styles.next}`,
  enterActive: `${styles.item} ${styles.next} ${styles.left}`,
  enterDone: `${styles.item} ${styles.active}`,
  exit: `${styles.item} ${styles.active} ${styles.left}`,
  exitActive: `${styles.item}`,
  exitDone: `${styles.item}`,
};

const toLeftTransitions = {
  enter: `${styles.item} ${styles.prev}`,
  enterActive: `${styles.item} ${styles.prev} ${styles.right}`,
  enterDone: `${styles.item} ${styles.active}`,
  exit: `${styles.item} ${styles.active} ${styles.right}`,
  exitActive: `${styles.item}`,
  exitDone: `${styles.item}`,
};

/**
 * `<Slide />` renders a specific section of `<Carousel />`.
 *
 * It must be direct child of `<Slides />` component.
 */
export const Slide = ({
  children,
  isActive,
  pause,
  unPause,
  direction,
  className,
  caption,
  in: iN,
  onExited,
  ...props
}) => {
  return (
    <CSSTransition
      in={isActive || iN}
      timeout={600}
      classNames={
        direction === 'right' ? toRightTransitions : toLeftTransitions
      }
      onExited={onExited}
    >
      <div
        className={styles.item}
        onMouseEnter={pause}
        onMouseLeave={unPause}
        {...props}
      >
        {children}
        {caption && <div className={styles.caption}>{caption}</div>}
      </div>
    </CSSTransition>
  );
};
