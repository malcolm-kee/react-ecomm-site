import React from 'react';
import { Field } from './field';
import { HelpText } from './help-text';
import { Input, InputProps } from './input';
import { Label } from './label';
import { FieldStatus } from './type';

export type TextFieldProps = {
  status?: FieldStatus;
  label?: React.ReactNode;
  helpText?: React.ReactNode;
} & InputProps;

/**
 * TextField is just a composition of `Field`, `Input`, `Label`, and `HelpText`.
 *
 * Props not specified will be spreaded to `Input` element, including `ref`.
 *
 * If you need more control, compose them yourself.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ status, helpText, label, ...inputProps }, ref) {
    return (
      <Field status={status}>
        {label && <Label>{label}</Label>}
        <Input {...inputProps} ref={ref} />
        {helpText && <HelpText>{helpText}</HelpText>}
      </Field>
    );
  }
);
