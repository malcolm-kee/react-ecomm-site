import React from 'react';
import { render, waitForElement } from 'react-testing-library';

describe('entry point', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('can renders', async () => {
    const { getByText } = render(<div id="root" />);

    require('./index');

    const shopName = await waitForElement(() => getByText('Shopit'));

    expect(shopName).not.toBeNull();
  });
});
