import { Link, LinkProps } from '@reach/router';
import cx from 'classnames';
import React from 'react';
import { isDefined } from '../lib/typecheck';
import { omit } from '../lib/object';

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
  | {
      variant: 'link';
      items: LinkItemsProps[];
    } & JSX.IntrinsicElements['div']
  | {
      variant: 'button';
      items: ButtonItemProps[];
    } & JSX.IntrinsicElements['div']
  | {
      variant?: undefined;
      items: DefaultItemProps[];
    } & JSX.IntrinsicElements['ul'];

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
      className={cx('list-group', props.className)}
    >
      {props.items.map(
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
  ) : props.variant === 'button' ? (
    <div
      {...omit(props, ['variant', 'items'])}
      className={cx('list-group', props.className)}
    >
      {props.items.map(
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
    <ul
      {...omit(props, ['variant', 'items'])}
      className={cx('list-group', props.className)}
    >
      {props.items.map(
        ({ active, disabled, variant, label, className, ...props }, index) => (
          <li
            className={cx(
              'list-group-item',
              active && 'active',
              disabled && 'disabled',
              variant && `list-group-item-${variant}`,
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
