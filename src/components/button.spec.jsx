import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Button } from './button';

test(`<Button color="primary" />`, () => {
  render(<Button color="primary">Hi</Button>);

  expect(screen.getByText('Hi').className).toMatchInlineSnapshot(
    `"inline-block rounded bg-blue-500 text-gray-100 shadow px-4 py-2"`
  );
});
