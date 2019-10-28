import cx from 'classnames';
import React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  color:
    | 'default'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'link';
  size?: 'lg' | 'sm' | 'xs';
  children: React.ReactNode;
};

/**
 * Button is a wrapper of `button` element.
 *
 * `ref` will be forwarded to the underlying `button` element.
 *
 * Other than specified props, any other props will be spreaded to the `button` element.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { type = 'button', color, size, className, ...buttonProps },
    ref
  ) {
    return (
      <button
        className={cx(
          'btn',
          color && `btn-${color}`,
          size && `btn-${size}`,
          className
        )}
        type={type}
        {...buttonProps}
        ref={ref}
      />
    );
  }
);
