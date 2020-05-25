import cx from 'classnames';
import * as React from 'react';
import { FieldContext } from './field-context';

/**
 * Label is just a wrapper around html `label` element.
 *
 * It accepts all props `label` element accepts.
 *
 * However, it will sync its `htmlFor` with the id of the input within same `Field` component
 */
export function Label({ className, ...props }: JSX.IntrinsicElements['label']) {
  const { inputId } = React.useContext(FieldContext);

  return (
    <label
      className={cx('pl-2 leading-loose', className)}
      htmlFor={inputId}
      {...props}
    />
  );
}
