import cx from 'classnames';
import * as React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
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
  renderContainer?: (
    providedProps: JSX.IntrinsicElements['button']
  ) => JSX.Element;
};

export const colorClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  default: 'bg-white text-gray-900 shadow',
  primary: 'bg-blue-500 text-gray-100 shadow',
  success: 'bg-green-500 text-gray-100 shadow',
  info: 'bg-teal-500 text-gray-100 shadow',
  warning: 'bg-orange-500 text-gray-100 shadow',
  danger: 'bg-red-500 text-gray-100 shadow',
  link: 'bg-white text-blue-700',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  lg: 'text-lg leading-relaxed px-4 py-2',
  sm: 'text-sm leading-tight px-3 py-2',
  xs: 'text-xs px-2 py-1',
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
    {
      type = 'button',
      color,
      size,
      className,
      renderContainer = (providedProps) => <button {...providedProps} />,
      disabled,
      ...buttonProps
    },
    ref
  ) {
    return renderContainer({
      className: cx(
        'inline-block rounded',
        disabled
          ? 'bg-gray-500 text-gray-100 cursor-not-allowed'
          : color && colorClasses[color],
        size ? sizeClasses[size] : 'px-4 py-2',
        className
      ),
      type,
      disabled,
      ...buttonProps,
    });
  }
);
