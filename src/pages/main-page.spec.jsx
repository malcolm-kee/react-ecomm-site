import { cleanup, fireEvent, screen } from '@testing-library/react';
import * as React from 'react';
import { queryCache } from 'react-query';
import xhrMock, { sequence } from 'xhr-mock';
import { renderWithStateMgmtAndRouter } from '../lib/test-util';
import { PRODUCT_DB } from '../modules/products/__mocks__/product.service';
import { MainPage } from './main-page';

jest.mock('../modules/marketing/marketing.service');

const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

function loadMainPage() {
  return {
    ...renderWithStateMgmtAndRouter(<MainPage />),
    scrollWindow: () =>
      fireEvent(
        window,
        new UIEvent('scroll', { bubbles: false, cancelable: false })
      ),
    getNumberOfProducts: () => screen.getAllByTestId('productBox').length,
  };
}

describe('<MainPage />', () => {
  beforeEach(() => xhrMock.setup());

  afterEach(() => {
    xhrMock.teardown();
    queryCache.clear();
  });

  it('renders without crashing', () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });
    loadMainPage();
    expect(screen.getByText('Shopit')).not.toBeNull();
    cleanup();
  });

  it('shows the product from API', async () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });

    loadMainPage();

    const iPhoneXBox = await screen.findByText('iPhone X');

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
