import { cleanup, fireEvent, screen } from '@testing-library/react';
import { PRODUCT_DB } from 'modules/products/__mocks__/product.service';
import * as React from 'react';
import xhrMock, { sequence } from 'xhr-mock';
import { renderWithStateMgmt } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

const PRODUCT_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

describe('<MainPage />', () => {
  it('renders without crashing', async () => {
    renderWithStateMgmt(<MainPage />);
    expect(screen.getByText('Shopit')).not.toBeNull();

    await screen.findByText(PRODUCT_DB[0].name);

    cleanup();
  });

  it('load more products when scroll', async () => {
    xhrMock.get(
      new RegExp(PRODUCT_URL, 'u'),
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

    renderWithStateMgmt(<MainPage />);

    await screen.findByText(PRODUCT_DB[0].name);

    expect(screen.getAllByTestId('productBox')).toHaveLength(2);

    fireEvent(
      window,
      new UIEvent('scroll', { bubbles: false, cancelable: false })
    );

    await screen.findByText(PRODUCT_DB[3].name);

    expect(screen.getAllByTestId('productBox')).toHaveLength(4);

    cleanup();
  });
});
