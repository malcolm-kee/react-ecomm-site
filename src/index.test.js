import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';

describe('entry point', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('can renders', async () => {
    const { getAllByText } = render(<div id="root" />);

    require('./index');

    const shopName = await waitForElement(() => getAllByText('Shopit'));

    expect(shopName.length).toBeGreaterThan(0);
  });
});
