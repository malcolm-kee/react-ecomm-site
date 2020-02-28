import { render } from '@testing-library/react';
import React from 'react';
import { Spinner } from './spinner';

test(`renders without props will show instantly`, () => {
  const { getByRole } = render(<Spinner />);

  expect(getByRole('progressbar')).not.toBeNull();
});

test(`renders with delay will show after wait`, async () => {
  const { queryByRole, findByRole } = render(<Spinner delayShow={200} />);

  expect(queryByRole('progressbar')).toBeNull();

  const spinner = await findByRole('progressbar');
  expect(spinner).not.toBeNull();
});
