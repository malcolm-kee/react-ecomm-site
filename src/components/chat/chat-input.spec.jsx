import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ChatInput } from './chat-input';

describe(`<ChatInput />`, () => {
  it('can render', () => {
    const onSendFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <ChatInput onSend={onSendFn} />
    );
    getByPlaceholderText('Type a message').value = 'Malcolm';

    fireEvent.click(container.querySelector('button'));
    expect(onSendFn).toHaveBeenCalledTimes(1);
    expect(onSendFn).toHaveBeenCalledWith('Malcolm');
  });
});
