import { render } from '@testing-library/react';
import React from 'react';
import { user } from '../lib/test-util';
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

    user.click(getByText('Malcolm'));

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenLastCalledWith('malcolm');

    user.click(getByText('Hello'));
    // clicking disabled button has no effect
    expect(callBack).toHaveBeenCalledTimes(1);

    onFocus.mockClear();
    buttonRef.current.focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
