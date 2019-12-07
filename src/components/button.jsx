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
});

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
