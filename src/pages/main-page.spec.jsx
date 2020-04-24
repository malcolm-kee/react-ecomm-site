import { fireEvent } from '@testing-library/react';
import * as React from 'react';
import xhrMock, { sequence } from 'xhr-mock';
import { renderWithStateMgmtAndRouter } from '../lib/test-util';
import { PRODUCT_DB } from '../modules/products/__mocks__/product.service';
import { MainPage } from './main-page';

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

const PRODUCT_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

describe('<MainPage />', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  it('renders without crashing', async () => {
    xhrMock.get(new RegExp(PRODUCT_URL, 'u'), {
      status: 200,
      body: JSON.stringify([PRODUCT_DB[0]]),
    });

    const { getByText, findByText } = loadMainPage();
    expect(getByText('Shopit')).not.toBeNull();

    await findByText(PRODUCT_DB[0].name);
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

    const { findByText, scrollWindow, getNumberOfProducts } = loadMainPage();

    await findByText(PRODUCT_DB[0].name);

    expect(getNumberOfProducts()).toBe(2);

    scrollWindow();

    await findByText(PRODUCT_DB[3].name);

    expect(getNumberOfProducts()).toBe(4);
  });
});
