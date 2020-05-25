import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './input';

describe('<Input />', () => {
  it('call both onChange and onChangeValue when value change', () => {
    const onChange = jest.fn((ev) => ev.target.value);
    const onChangeValue = jest.fn();
    const { getByTestId } = render(
      <Input
        data-testid="input"
        onChange={onChange}
        onChangeValue={onChangeValue}
      />
    );
    fireEvent.change(getByTestId('input'), { target: { value: 'abc' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0].value).toBe('abc');
    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith('abc');
  });

  it('forward ref to underlying input', () => {
    const onFocus = jest.fn();
    const inputRef = React.createRef();
    render(<Input onFocus={onFocus} ref={inputRef} />);

    inputRef.current.focus();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
