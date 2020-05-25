import * as React from 'react';
import { Field } from './field';
import { HelpText } from './help-text';
import { Label } from './label';
import { Select, SelectProps } from './select';
import { FieldStatus } from './type';

type SelectFieldProps = SelectProps & {
  status?: FieldStatus;
  helpText?: React.ReactNode;
  label?: React.ReactNode;
};

/**
 * SelectField is just a composition of `Field`, `Select`, `Label`, and `HelpText`.
 *
 * Props not specified will be spreaded to `Select` element, including `ref`.
 *
 * If you need more control, compose them yourself.
 */
export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(function SelectField({ status, helpText, label, ...selectProps }, ref) {
  return (
    <Field status={status}>
      {label && <Label>{label}</Label>}
      <Select {...selectProps} ref={ref} />
      {helpText && <HelpText>{helpText}</HelpText>}
    </Field>
  );
});
