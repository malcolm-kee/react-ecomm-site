import cx from 'classnames';
import React from 'react';
import { FieldContext } from './field-context';

export function HelpText({ className, ...props }) {
  const { inputId } = React.useContext(FieldContext);

  return (
    <span
      id={`${inputId}-help`}
      className={cx('text-sm pl-2', className)}
      {...props}
    />
  );
}
