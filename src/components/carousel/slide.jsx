import cx from 'classnames';
import React from 'react';

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
  className,
  ...props
}) => {
  return (
    <div
      className={cx('item', isActive && 'active', className)}
      onMouseEnter={pause}
      onMouseLeave={unPause}
      {...props}
    >
      {children}
    </div>
  );
};

export default Slide;
