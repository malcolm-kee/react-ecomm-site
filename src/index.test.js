import { render, screen } from '@testing-library/react';
import * as React from 'react';

describe('entry point', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('can renders', async () => {
    render(<div id="root" />);

    require('./index');

    const shopName = await screen.findAllByText('Shopit');

    expect(shopName.length).toBeGreaterThan(0);
  });
});
