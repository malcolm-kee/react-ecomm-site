import React from 'react';

export const ImportantIcon = ({
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
    <path d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z" />
  </svg>
);
