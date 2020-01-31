import React from 'react';

export const LeftIcon = ({
  width = 24,
  height = width,
  focusable = false,
  'aria-hidden': ariaHidden = true,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    focusable={focusable}
    aria-hidden={ariaHidden}
    {...props}
  >
    <path d="M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z" />
  </svg>
);
