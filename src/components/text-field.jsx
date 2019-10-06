import React from 'react';
import PropTypes from 'prop-types';
import { Field } from './field';
import { Input } from './input';
import { Label } from './label';
import { HelpText } from './help-text';
import { FieldStatus } from './prop-types';

/**
 * TextField is just a composition of `Field`, `Input`, `Label`, and `HelpText`.
 *
 * Props not specified will be spreaded to `Input` element, including `ref`.
 *
 * If you need more control, compose them yourself.
 */
export const TextField = React.forwardRef(function TextField(
  { status, helpText, label, ...inputProps },
  ref
) {
  return (
    <Field status={status}>
      {label && <Label>{label}</Label>}
      <Input {...inputProps} ref={ref} />
      {helpText && <HelpText>{helpText}</HelpText>}
    </Field>
  );
});

TextField.propTypes = {
  status: FieldStatus,
  helpText: PropTypes.node,
  label: PropTypes.node
};
