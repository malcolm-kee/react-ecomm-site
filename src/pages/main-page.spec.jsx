import { act, fireEvent, screen, wait, cleanup } from '@testing-library/react';
import * as React from 'react';
import { renderWithStateMgmt } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

function loadMainPage() {
  return {
    ...renderWithStateMgmt(<MainPage />),
    scrollWindow: () =>
      fireEvent(
        window,
        new UIEvent('scroll', { bubbles: false, cancelable: false })
      ),
    getNumberOfProducts: () => screen.getAllByTestId('productBox').length,
  };
}

describe('<MainPage />', () => {
  it('renders without crashing', () => {
    loadMainPage();
    expect(screen.getByText('Shopit')).not.toBeNull();

    cleanup();
  });

  it('shows the product from API', async () => {
    loadMainPage();
    const iPhoneXBox = await screen.findByText('iPhone X');

    expect(iPhoneXBox).not.toBeNull();

    cleanup();
  });

  it('load more products when scroll', async () => {
    const { scrollWindow, getNumberOfProducts } = loadMainPage();

    await screen.findByText('iPhone X');

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

    cleanup();
  });
});
