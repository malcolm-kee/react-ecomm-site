import { act, fireEvent, wait, waitForElement } from '@testing-library/react';
import React from 'react';
import { renderWithStateMgmt } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

function loadMainPage() {
  const renderResults = renderWithStateMgmt(<MainPage />);

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
    const { getByText } = loadMainPage();

    const iPhoneXBox = await waitForElement(() => getByText('iPhone X'));

    expect(iPhoneXBox).not.toBeNull();
  });

  it('load more products when scroll', async () => {
    const { getByText, scrollWindow, getNumberOfProducts } = loadMainPage();

    await waitForElement(() => getByText('iPhone X'));

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
