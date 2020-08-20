import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { NumberInput } from './number-input';

describe(`<NumberInput />`, () => {
  it(`works`, async () => {
    const TestBed = () => {
      const [value, setValue] = React.useState('200');
      return <NumberInput value={value} onChangeValue={setValue} />;
    };

    render(<TestBed />);

    expect(screen.getByRole('textbox')).toHaveValue('200.00');
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: '2200.00',
      },
    });
    expect(screen.getByRole('textbox')).toHaveValue('2,200.00');
  });
});
