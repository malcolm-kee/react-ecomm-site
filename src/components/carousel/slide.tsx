import React from 'react';
import { CSSTransition } from 'react-transition-group';

const toRightTransitions = {
  enter: 'item next',
  enterActive: 'item next left',
  enterDone: 'item active',
  exit: 'item active left',
  exitActive: 'item',
  exitDone: 'item',
};

const toLeftTransitions = {
  enter: 'item prev',
  enterActive: 'item prev right',
  enterDone: 'item active',
  exit: 'item active right',
  exitActive: 'item',
  exitDone: 'item',
};

export type SlideProps = {
  isActive?: boolean;
  pause?: () => void;
  unPause?: () => void;
  direction?: 'left' | 'right';
} & JSX.IntrinsicElements['div'];

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
  ...props
}: SlideProps) => {
  return (
    <CSSTransition
      in={isActive}
      timeout={600}
      classNames={
        direction === 'right' ? toRightTransitions : toLeftTransitions
      }
    >
      <div
        className="item"
        onMouseEnter={pause}
        onMouseLeave={unPause}
        {...props}
      >
        {children}
      </div>
    </CSSTransition>
  );
};
