import { act, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import { renderWithStateMgmtAndRouter } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

function loadMainPage() {
  const renderResults = renderWithStateMgmtAndRouter(<MainPage />);

  const { container } = renderResults;

  return {
    ...renderResults,
    scrollWindow: () =>
      fireEvent(
        window,
        new UIEvent('scroll', { bubbles: false, cancelable: false })
      ),
    getNumberOfProducts: () =>
      container.querySelectorAll('.product-box').length,
  };
}

describe('<MainPage />', () => {
  it('renders without crashing', () => {
    const { getByText } = loadMainPage();
    expect(getByText('Shopit')).not.toBeNull();
  });

  it('shows the product from API', async () => {
    const { findByText } = loadMainPage();

    const iPhoneXBox = await findByText('iPhone X');

    expect(iPhoneXBox).not.toBeNull();
  });

  it('load more products when scroll', async () => {
    const { findByText, scrollWindow, getNumberOfProducts } = loadMainPage();

    await findByText('iPhone X');

    expect(getNumberOfProducts()).toBe(2);

    jest.useFakeTimers();

    scrollWindow();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // restore timer so it doesn't break promise
    jest.useRealTimers();

    await wait();

    expect(getNumberOfProducts()).toBe(4);
  });
});
