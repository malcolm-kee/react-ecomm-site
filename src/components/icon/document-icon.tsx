import * as React from 'react';

export const DocumentIcon = ({
  width = 24,
  height = width,
  focusable = false,
  'aria-hidden': ariaHidden = true,
  ...props
}: JSX.IntrinsicElements['svg']) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    focusable={focusable}
    aria-hidden={ariaHidden}
    {...props}
  >
    <path d="M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z" />
    <polygon points="14 2 20 8 14 8" />
  </svg>
);
