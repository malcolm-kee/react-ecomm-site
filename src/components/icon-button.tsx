import cx from 'classnames';
import * as React from 'react';
import { ButtonProps, colorClasses } from './button';

export type IconButtonProps = React.ComponentPropsWithoutRef<'button'> &
  Pick<ButtonProps, 'color'> & {
    size?: 'normal' | 'large';
  };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { type = 'button', className, color, size = 'normal', ...buttonProps },
    ref
  ) {
    return (
      <button
        {...buttonProps}
        type={type}
        className={cx(
          'rounded-full overflow-hidden focus:outline-none focus:shadow-outline',
          sizeClasses[size],
          color && colorClasses[color],
          className
        )}
        ref={ref}
      />
    );
  }
);

const sizeClasses = {
  normal: 'p-1',
  large: 'p-2',
};
