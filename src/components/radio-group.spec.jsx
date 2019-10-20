import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  test('positive scenario', () => {
    const onChangeValue = jest.fn();
    const options = [
      { value: 'react', label: 'React' },
      { value: 'ng', label: 'Angular' },
      { value: 'vue', label: 'Vue' }
    ];

    const { getByLabelText, rerender } = render(
      <RadioGroup
        label="Frameworks"
        onChangeValue={onChangeValue}
        options={options}
      />
    );

    fireEvent.click(getByLabelText('Angular'));
    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith('ng');

    rerender(
      <RadioGroup
        label="Frameworks"
        value="ng"
        onChangeValue={onChangeValue}
        options={options}
      />
    );
  });
});
