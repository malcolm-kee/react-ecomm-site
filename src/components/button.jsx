import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Button is a wrapper of `button` element.
 *
 * `ref` will be forwarded to the underlying `button` element.
 *
 * Other than specified props, any other props will be spreaded to the `button` element.
 */
export const Button = React.forwardRef(function Button(
  { type = 'button', color, size, className, ...buttonProps },
  ref
) {
  return (
    <button
      className={cx(
        'rounded',
        color && colorClasses[color],
        size ? sizeClasses[size] : 'px-4 py-2',
        className
      )}
      type={type}
      {...buttonProps}
      ref={ref}
    />
  );
});

const colorClasses = {
  default: 'bg-white text-gray-900 shadow',
  primary: 'bg-blue-500 text-gray-100 shadow',
  success: 'bg-green-500 text-gray-100 shadow',
  info: 'bg-teal-500 text-gray-100 shadow',
  warning: 'bg-orange-500 text-gray-100 shadow',
  danger: 'bg-red-500 text-gray-100 shadow',
  link: 'bg-white text-blue-700',
};

const sizeClasses = {
  lg: 'text-lg leading-relaxed px-4 py-2',
  sm: 'text-sm leading-tight px-3 py-2',
  xs: 'text-xs px-2 py-1',
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * color for the button
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
  ]),
  size: PropTypes.oneOf(['lg', 'sm', 'xs']),
  children: PropTypes.node.isRequired,
};
