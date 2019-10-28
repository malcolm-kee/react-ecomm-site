import cx from 'classnames';
import React from 'react';

export type ButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color'
> & {
  color?:
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
 * Other than specified props, any other props will be spreaded to the `button` element.
 */
export function Button({
  type = 'button',
  color,
  size,
  className,
  ...buttonProps
}: ButtonProps) {
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
    />
  );
}
