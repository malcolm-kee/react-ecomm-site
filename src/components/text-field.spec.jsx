import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TextField } from './text-field';

test(`renders TextField`, () => {
  const { getByLabelText } = render(<TextField label="Age" type="number" />);
  expect(getByLabelText('Age').type).toBe('number');
});

test(`TextField invoke onChangeValue when input value change`, () => {
  const onChangeValueHandler = jest.fn();
  const { getByLabelText } = render(
    <TextField label="Name" onChangeValue={onChangeValueHandler} />
  );

  fireEvent.change(getByLabelText('Name'), {
    target: { value: 'Malcolm' },
  });

  expect(onChangeValueHandler).toHaveBeenCalledTimes(1);
  expect(onChangeValueHandler).toHaveBeenCalledWith('Malcolm');
});
