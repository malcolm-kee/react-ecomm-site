import { cleanup, fireEvent, screen } from '@testing-library/react';
import * as React from 'react';
import xhrMock, { sequence } from 'xhr-mock';
import MainPage from '.';
import { renderWithStateMgmtAndRouter } from '../lib/test-util';
import { PRODUCT_DB } from '../modules/products/__mocks__/product.service';

jest.mock('../modules/marketing/marketing.service');

const PRODUCT_BASE_URL = process.env.NEXT_PUBLIC_PRODUCT_BASE_URL;

describe('<MainPage />', () => {
  beforeEach(() => xhrMock.setup());

  afterEach(() => xhrMock.teardown());

  it('renders without crashing', () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });

    renderWithStateMgmtAndRouter(<MainPage />);

    expect(screen.getByText('Shopit')).not.toBeNull();
    cleanup();
  });

  it('shows the product from API', async () => {
    xhrMock.get(new RegExp(PRODUCT_BASE_URL, 'u'), {
      status: 200,
      body: JSON.stringify(PRODUCT_DB.slice(0, 2)),
    });

    renderWithStateMgmtAndRouter(<MainPage />);

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

    renderWithStateMgmtAndRouter(<MainPage />);

    await screen.findByText('iPhone X');

    expect(screen.getAllByTestId('productBox')).toHaveLength(2);

    fireEvent(
      window,
      new UIEvent('scroll', { bubbles: false, cancelable: false })
    );

    await screen.findByText('dodo');
    expect(screen.getAllByTestId('productBox')).toHaveLength(4);
    cleanup();
  });
});
