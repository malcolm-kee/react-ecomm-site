import { render } from '@testing-library/react';
import * as React from 'react';
import { user } from '../lib/test-util';
import { DateInput } from './date-input';

describe(`<DateInput />`, () => {
  test('able to work without dateFormat', () => {
    const { getByTestId, getByText } = setup();

    user.click(getByTestId('dateinput'));
    user.click(getByText('12'));

    expect(getByTestId('dateinput').value.substring(0, 2)).toBe('12');
  });

  test('it shows datepicker when button is clicked', () => {
    const { getByLabelText, getByTestId, getByText } = setup();

    user.click(getByLabelText('open date picker'));
    user.click(getByText('12'));

    expect(getByTestId('dateinput').value.substring(0, 2)).toBe('12');
  });

  test('able to work with dateFormat', () => {
    const { getByTestId, getByText } = setup({
      defaultValue: '2020-01-01',
      dateFormat: 'yyyy-mm-dd',
    });

    user.click(getByTestId('dateinput'));
    user.click(getByText('25'));

    expect(getByTestId('dateinput')).toHaveValue('2020-01-25');
  });

  test('update value based on props', () => {
    const { rerender, getByTestId } = render(
      <DateInput value="01-01-2020" data-testid="dateinput" />
    );
    expect(getByTestId('dateinput')).toHaveValue('01-01-2020');

    rerender(<DateInput value="02-02-2020" data-testid="dateinput" />);
    expect(getByTestId('dateinput')).toHaveValue('02-02-2020');

    rerender(<DateInput value="" data-testid="dateinput" />);
    expect(getByTestId('dateinput')).toHaveValue('');
  });

  test('it show datepicker when autoFocus', () => {
    render(<DateInput autoFocus data-testid="dateinput" />);

    expect(document.querySelector('.datepick-popup')).toBeVisible();
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
