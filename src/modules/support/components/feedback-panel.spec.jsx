import { act, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { toast as toastMock } from 'react-toastify';
import { FeedbackPanel } from './feedback-panel';
jest.mock('react-toastify');

afterEach(() => {
  jest.clearAllMocks();
});

describe(`<FeedbackPanel />`, () => {
  it('feedback success when user click Yes', () => {
    const { getByText } = render(<FeedbackPanel />);
    act(() => user.click(getByText('Yes')));
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  it('feedback success when user try to click No', () => {
    const { getByText } = render(<FeedbackPanel />);
    act(() => user.click(getByText('No')));
    expect(toastMock).toHaveBeenCalledTimes(1);
  });
});
