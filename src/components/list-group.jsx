import { Link } from '@reach/router';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @see https://getbootstrap.com/docs/3.3/components/#list-group
 */
export const ListGroup = ({ items, variant }) => {
  return variant === 'link' ? (
    <div className="list-group">
      {items.map(({ label, active, disabled, ...linkProps }, index) => (
        <Link
          getProps={({ isCurrent }) => ({
            className: cx(
              'list-group-item',
              isCurrent && 'active',
              disabled && 'disabled'
            )
          })}
          {...linkProps}
          key={index}
        >
          {label}
        </Link>
      ))}
    </div>
  ) : variant === 'button' ? (
    <div className="list-group">
      {items.map(({ label, active, disabled, ...buttonProps }, index) => (
        <button
          type="button"
          className={cx(
            'list-group-item',
            active && 'active',
            disabled && 'disabled'
          )}
          disabled={disabled}
          {...buttonProps}
          key={index}
        >
          {label}
        </button>
      ))}
    </div>
  ) : (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          className={cx(
            'list-group-item',
            item.active && 'active',
            item.disabled && 'disabled',
            item.variant && `list-group-item-${item.variant}`
          )}
          key={index}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  variant: PropTypes.oneOf(['link', 'button']),
  /**
   * Except the following four properties, you can also provide additional props to item when `variant` is
   * - `link`: any props supported by `Link` component
   * - `button`: any props supported by `<button>` element
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      variant: PropTypes.oneOf(['success', 'warning', 'info', 'danger'])
    })
  ).isRequired
};
