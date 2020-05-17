import cx from 'classnames';
import { callAll } from 'lib/fn-lib';
import { omit } from 'lib/object';
import { isDefined } from 'lib/typecheck';
import PropTypes from 'prop-types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * `ListGroup` renders a list of items.
 *
 * All props except `variant` and `items` will be spreaded to the underlying container.
 *
 */
export const ListGroup = (props) => {
  return props.variant === 'link' ? (
    <div
      {...omit(props, ['items', 'variant'])}
      className={cx('rounded', props.className)}
    >
      {props.items.map(
        (
          {
            label,
            active,
            disabled,
            variant,
            className,
            onClick,
            ...linkProps
          },
          index,
          allItems
        ) => (
          <NavLink
            className={cx(
              'block w-full border px-4 py-2 text-left',
              disabled
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : variant && variantClasses[variant].base,
              index === allItems.length - 1 && 'rounded-b-lg',
              className
            )}
            activeClassName={
              disabled
                ? undefined
                : variant
                ? variantClasses[variant].active
                : 'bg-blue-500 text-gray-100'
            }
            isActive={(match) => (isDefined(active) ? active : !!match)}
            onClick={callAll(
              onClick,
              disabled ? (ev) => ev.preventDefault() : undefined
            )}
            {...linkProps}
            key={index}
          >
            {label}
          </NavLink>
        )
      )}
    </div>
  ) : props.variant === 'button' ? (
    <div {...omit(props, ['variant', 'items'])} className={props.className}>
      {props.items.map(
        (
          { label, active, disabled, variant, className, ...buttonProps },
          index,
          allItems
        ) => (
          <button
            type="button"
            className={cx(
              'block w-full border px-4 py-2 text-left',
              disabled
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : variant
                ? active
                  ? variantClasses[variant].active
                  : variantClasses[variant].base
                : active && 'bg-blue-500 text-gray-100',
              index === 0 && 'rounded-t-lg',
              index === allItems.length - 1 && 'rounded-b-lg',
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
    <ul {...omit(props, ['variant', 'items'])} className={props.className}>
      {props.items.map(
        (
          { active, disabled, variant, label, className, ...props },
          index,
          allItems
        ) => (
          <li
            className={cx(
              'border px-4 py-2',
              disabled
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : variant
                ? active
                  ? variantClasses[variant].active
                  : variantClasses[variant].base
                : active && 'bg-blue-500 text-gray-100 border-blue-500',
              index === 0 && 'rounded-t-lg',
              index === allItems.length - 1 && 'rounded-b-lg',
              className
            )}
            aria-current={active ? true : undefined}
            {...props}
            key={index}
          >
            {label}
          </li>
        )
      )}
    </ul>
  );
};

const variantClasses = {
  success: {
    base: 'bg-green-200 text-gray-900',
    active: 'bg-green-500 text-gray-100 border-green-500',
  },
  info: {
    base: 'bg-teal-200 text-gray-900',
    active: 'bg-teal-500 text-gray-100 border-teal-500',
  },
  warning: {
    base: 'bg-orange-200 text-gray-900',
    active: 'bg-orange-500 text-gray-100 border-orange-500',
  },
  danger: {
    base: 'bg-red-200 text-gray-900',
    active: 'bg-red-500 text-gray-100 border-red-500',
  },
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
      variant: PropTypes.oneOf(['success', 'warning', 'info', 'danger']),
    })
  ).isRequired,
};
