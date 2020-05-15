import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { user } from 'lib/test-util';
import { Alert } from './alert';

describe(`<Alert />`, () => {
  it(`renders and dismissed`, () => {
    const msg = 'Hello';
    render(
      <Alert dismissible>
        <p>{msg}</p>
      </Alert>
    );

    expect(screen.getByText(msg)).toBeVisible();

    user.click(screen.getByLabelText('Close'));
    expect(screen.queryByText(msg)).toBeNull();
  });
});
