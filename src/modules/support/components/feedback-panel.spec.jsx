import { render } from '@testing-library/react';
import { toast as toastMock } from 'components/toast';
import { user } from 'lib/test-util';
import * as React from 'react';
import { FeedbackPanel } from './feedback-panel';
jest.mock('components/toast');

afterEach(() => {
  jest.clearAllMocks();
});

describe(`<FeedbackPanel />`, () => {
  it('feedback success when user click Yes', () => {
    const { getByText } = render(<FeedbackPanel />);
    user.click(getByText('Yes'));
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  it('feedback success when user try to click No', () => {
    const { getByText } = render(<FeedbackPanel />);
    user.click(getByText('No'));
    expect(toastMock).toHaveBeenCalledTimes(1);
  });
});
