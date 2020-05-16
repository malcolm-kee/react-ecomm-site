import cx from 'classnames';
import * as React from 'react';
import { FieldContext } from './field-context';
import { FieldStatus } from './type';
import { useId } from 'hooks/use-id';

export type FieldProps = {
  /**
   * validation status of the field, which will styles related component
   * within it, e.g. `Input` and `HelpText` accordingly
   */
  status?: FieldStatus;
} & JSX.IntrinsicElements['div'];

/**
 * `Field` is a component that provides contextual styling
 * of the `Input` and `Label` within it. In addition, it will
 * provides default props to `Input` and `Label` for accessibility.
 *
 * Props not specified will be spreaded to the underlying `div` element.
 */
export function Field({ status, className, ...props }: FieldProps) {
  const id = useId();
  const [inputId, setInputId] = React.useState<string | undefined>(undefined);

  return (
    <FieldContext.Provider value={{ inputId: inputId || id, setInputId }}>
      <div
        className={cx('mb-2', status && statusClasses[status], className)}
        {...props}
      />
    </FieldContext.Provider>
  );
}

const statusClasses: Record<FieldStatus, string> = {
  success: 'text-green-600',
  warning: 'text-orange-600',
  error: 'text-red-600',
};
