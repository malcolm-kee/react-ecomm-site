import PropTypes from 'prop-types';
import React from 'react';
import { Field } from './field';
import { HelpText } from './help-text';
import { Label } from './label';
import { FieldStatus } from './prop-types';
import { Select } from './select';

/**
 * SelectField is just a composition of `Field`, `Select`, `Label`, and `HelpText`.
 *
 * Props not specified will be spreaded to `Select` element, including `ref`.
 *
 * If you need more control, compose them yourself.
 */
export const SelectField = React.forwardRef(function SelectField(
  { status, helpText, label, ...selectProps },
  ref
) {
  return (
    <Field status={status}>
      {label && <Label>{label}</Label>}
      <Select {...selectProps} ref={ref} />
      {helpText && <HelpText>{helpText}</HelpText>}
    </Field>
  );
});

SelectField.propTypes = {
  status: FieldStatus,
  helpText: PropTypes.node,
  label: PropTypes.node,
};
