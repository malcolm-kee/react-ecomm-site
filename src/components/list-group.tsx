import cx from 'classnames';
import React from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { omit } from '../lib/object';
import { isDefined } from '../lib/typecheck';
import { callAll } from 'lib/fn-lib';

type ItemBaseProps = {
  label: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  variant?: 'success' | 'warning' | 'info' | 'danger';
};

type LinkItemsProps = ItemBaseProps & Omit<LinkProps<any>, 'ref'>;
type ButtonItemProps = ItemBaseProps & JSX.IntrinsicElements['button'];
type DefaultItemProps = ItemBaseProps & JSX.IntrinsicElements['li'];

export type ListGroupProps =
  | ({
      variant: 'link';
      items: LinkItemsProps[];
    } & JSX.IntrinsicElements['div'])
  | ({
      variant: 'button';
      items: ButtonItemProps[];
    } & JSX.IntrinsicElements['div'])
  | ({
      variant?: undefined;
      items: DefaultItemProps[];
    } & JSX.IntrinsicElements['ul']);

/**
 * `ListGroup` renders a list of items.
 *
 * All props except `variant` and `items` will be spreaded to the underlying container.
 *
 * @see https://getbootstrap.com/docs/3.3/components/#list-group
 */
export const ListGroup = (props: ListGroupProps) => {
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

const variantClasses: Record<
  NonNullable<ItemBaseProps['variant']>,
  { active: string; base: string }
> = {
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
