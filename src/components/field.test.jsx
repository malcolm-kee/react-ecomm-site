import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Field } from './field';
import { HelpText } from './help-text';
import { Input } from './input';
import { Label } from './label';

describe('<Field />', () => {
  it('will associate Input and Label in it', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
      <Field>
        <Label>Email</Label>
        <Input onFocus={onFocus} />
      </Field>
    );

    fireEvent.focus(getByLabelText('Email'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('will associate Input and Label correctly when id is provided at Input', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <Field>
        <Label>Age</Label>
        <Input type="number" onBlur={onBlur} />
      </Field>
    );

    fireEvent.blur(getByLabelText('Age'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('associates helpText with input correctly', () => {
    render(
      <Field status="error">
        <Input />
        <HelpText>Required</HelpText>
      </Field>
    );
  });
});
