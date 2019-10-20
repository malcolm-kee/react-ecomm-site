import { Link } from '@reach/router';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { isDefined } from '../lib/typecheck';

/**
 * `ListGroup` renders a list of items.
 *
 * All props except `variant` and `items` will be spreaded to the underlying container
 *
 * @see https://getbootstrap.com/docs/3.3/components/#list-group
 */
export const ListGroup = ({ items, variant, className, ...containerProps }) => {
  return variant === 'link' ? (
    <div className={cx('list-group', className)} {...containerProps}>
      {items.map(
        (
          { label, active, disabled, variant, className, ...linkProps },
          index
        ) => (
          <Link
            getProps={({ isCurrent }) => ({
              className: cx(
                'list-group-item',
                (isDefined(active) ? active : isCurrent) && 'active',
                disabled && 'disabled',
                variant && `list-group-item-${variant}`,
                className
              )
            })}
            {...linkProps}
            key={index}
          >
            {label}
          </Link>
        )
      )}
    </div>
  ) : variant === 'button' ? (
    <div className={cx('list-group', className)} {...containerProps}>
      {items.map(
        (
          { label, active, disabled, variant, className, ...buttonProps },
          index
        ) => (
          <button
            type="button"
            className={cx(
              'list-group-item',
              active && 'active',
              disabled && 'disabled',
              variant && `list-group-item-${variant}`,
              className
            )}
            disabled={disabled}
            {...buttonProps}
            key={index}
          >
            {label}
          </button>
        )
      )}
    </div>
  ) : (
    <ul className={cx('list-group', className)} {...containerProps}>
      {items.map(
        (
          { active, disabled, variant, label, className, ...itemProps },
          index
        ) => (
          <li
            className={cx(
              'list-group-item',
              active && 'active',
              disabled && 'disabled',
              variant && `list-group-item-${variant}`,
              className
            )}
            key={index}
            {...itemProps}
          >
            {label}
          </li>
        )
      )}
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
