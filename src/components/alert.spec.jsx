import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { Alert } from './alert';

test(`Alert show contents but hidden when dismiss`, () => {
  render(
    <Alert color="warning" dismissible>
      <p>Some Message</p>
    </Alert>
  );
  expect(screen.getByText('Some Message')).toBeVisible();

  fireEvent.click(screen.getByLabelText('Close'));

  expect(screen.queryByText('Some Message')).toBeNull();
});
