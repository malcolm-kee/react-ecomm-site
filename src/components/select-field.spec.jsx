import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SelectField } from './select-field';

describe('SelectField', () => {
  it('can renders when options are passed as props', () => {
    const onChangeValue = jest.fn();

    const { getByLabelText } = render(
      <SelectField
        label="Lucky Number"
        options={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
        ]}
        onChangeValue={onChangeValue}
      />
    );

    fireEvent.change(getByLabelText('Lucky Number'), {
      target: {
        value: '2',
      },
    });

    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith('2');
  });

  it('can renders when options are passed as children', () => {
    const onChangeValue = jest.fn();

    const { getByLabelText } = render(
      <SelectField label="Lucky Number" onChangeValue={onChangeValue}>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </SelectField>
    );

    fireEvent.change(getByLabelText('Lucky Number'), {
      target: {
        value: '2',
      },
    });

    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith('2');
  });

  it('forward all props supported by select', () => {
    const selectRef = React.createRef();
    const onFocus = jest.fn();

    render(
      <SelectField
        label="Hey"
        onFocus={onFocus}
        options={[
          { label: 'HTML', value: 'html' },
          { label: 'CSS', value: 'css' },
          { label: 'JavaScript', value: 'js' },
        ]}
        ref={selectRef}
      />
    );

    selectRef.current.focus();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
