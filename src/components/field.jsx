import cx from 'classnames';
import React from 'react';
import { getId } from '../lib/id';
import { FieldContext } from './field-context';
import { FieldStatus } from './prop-types';

/**
 * `Field` is a component that provides contextual styling
 * of the `Input` and `Label` within it. In addition, it will
 * provides default props to `Input` and `Label` for accessibility.
 *
 * Props not specified will be spreaded to the underlying `div` element.
 */
export function Field({ status, className, ...props }) {
  const [inputId, setInputId] = React.useState(() => getId());

  return (
    <FieldContext.Provider value={{ inputId, setInputId }}>
      <div
        className={cx('form-group', status && `has-${status}`, className)}
        {...props}
      />
    </FieldContext.Provider>
  );
}

Field.propTypes = {
  /**
   * validation status of the field, which will styles related component
   * within it, e.g. `Input` and `HelpText` accordingly
   */
  status: FieldStatus
};
