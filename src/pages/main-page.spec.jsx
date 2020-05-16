import { cleanup, fireEvent } from '@testing-library/react';
import * as React from 'react';
import xhrMock, { sequence } from 'xhr-mock';
import MainPage from '.';
import { renderWithStateMgmtAndRouter } from '../lib/test-util';
import { PRODUCT_DB } from '../modules/products/__mocks__/product.service';

jest.mock('../modules/marketing/marketing.service');

const PRODUCT_BASE_URL = process.env.NEXT_PUBLIC_PRODUCT_BASE_URL;

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
  beforeEach(() => xhrMock.setup());

  afterEach(() => {
    xhrMock.teardown();
  });

  it('renders without crashing', () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });
    const { getByText } = loadMainPage();
    expect(getByText('Shopit')).not.toBeNull();
    cleanup();
  });

  it('shows the product from API', async () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });

    const { findByText } = loadMainPage();

    const iPhoneXBox = await findByText('iPhone X');

    expect(iPhoneXBox).not.toBeNull();
    cleanup();
  });

  it('load more products when scroll', async () => {
    xhrMock.get(
      new RegExp(PRODUCT_BASE_URL, 'u'),
      sequence([
        {
          status: 200,
          body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
        },
        {
          status: 200,
          body: JSON.stringify(PRODUCT_DB.slice(2, 4)),
        },
      ])
    );

    const { findByText, scrollWindow, getNumberOfProducts } = loadMainPage();

    await findByText('iPhone X');

    expect(getNumberOfProducts()).toBe(2);

    scrollWindow();

    await findByText('dodo');
    expect(getNumberOfProducts()).toBe(4);
    cleanup();
  });
});
