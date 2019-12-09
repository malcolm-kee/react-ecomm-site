import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DateInput } from './date-input';

describe('<DateInput />', () => {
  test('able to work without dateFormat', () => {
    const { getByTestId, getByText } = setup();

    fireEvent.focus(getByTestId('dateinput'));
    fireEvent.click(getByText('12'));

    expect(getByTestId('dateinput').value.substring(0, 2)).toBe('12');
  });

  test('able to work with dateFormat', () => {
    const { getByTestId, getByText } = setup({
      defaultValue: '2020-01-01',
      dateFormat: 'yyyy-mm-dd',
    });

    fireEvent.focus(getByTestId('dateinput'));
    fireEvent.click(getByText('25'));

    expect(getByTestId('dateinput')).toHaveValue('2020-01-25');
  });
});

function setup({ defaultValue = '', dateFormat } = {}) {
  function TestBed() {
    const [value, setValue] = React.useState(defaultValue);
    return (
      <DateInput
        value={value}
        onChangeValue={setValue}
        data-testid="dateinput"
        dateFormat={dateFormat}
      />
    );
  }

  const result = render(<TestBed />);
  return {
    ...result,
  };
}
