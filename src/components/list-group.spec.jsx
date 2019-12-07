import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { ListGroup } from './list-group';

describe('ListGroup button variant', () => {
  test('all button props will be passed on', () => {
    const callBack = jest.fn();
    const onFocus = jest.fn();
    const buttonRef = React.createRef();

    const { getByText } = render(
      <ListGroup
        variant="button"
        items={[
          {
            label: 'Malcolm',
            onClick: () => callBack('malcolm'),
            variant: 'success',
            onFocus: onFocus,
            ref: buttonRef,
          },
          {
            label: 'Hello',
            onClick: () => callBack('hello'),
            variant: 'warning',
            disabled: true,
          },
        ]}
      />
    );

    fireEvent.click(getByText('Malcolm'));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenLastCalledWith('malcolm');

    fireEvent.click(getByText('Hello'));
    // clicking disabled button has no effect
    expect(callBack).toHaveBeenCalledTimes(1);

    buttonRef.current.focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
