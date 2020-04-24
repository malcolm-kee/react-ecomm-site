import { render } from '@testing-library/react';
import * as React from 'react';

describe('entry point', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('can renders', async () => {
    const { findAllByText } = render(<div id="root" />);

    require('./index');

    const shopName = await findAllByText('Shopit');

    expect(shopName.length).toBeGreaterThan(0);
  });
});
