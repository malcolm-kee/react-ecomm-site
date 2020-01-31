import cx from 'classnames';
import * as React from 'react';

export const Badge = (props: JSX.IntrinsicElements['span']) => (
  <span
    {...props}
    className={cx(
      'inline-flex items-center justify-center text-xs font-bold ml-1 rounded-full bg-red-700 text-gray-100 w-5 h-5',
      props.className
    )}
  />
);
