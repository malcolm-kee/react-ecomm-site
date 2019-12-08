import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DateInput } from './date-input';

describe('<DateInput />', () => {
  test('able to work without dateFormat', async () => {
    const { getByTestId, getByText } = render(<TestBed />);

    fireEvent.focus(getByTestId('dateinput'));
    fireEvent.click(getByText('12'));

    expect(getByTestId('dateinput').value.substring(0, 2)).toBe('12');
  });
});

function TestBed() {
  const [value, setValue] = React.useState('');
  return (
    <DateInput value={value} onChangeValue={setValue} data-testid="dateinput" />
  );
}
