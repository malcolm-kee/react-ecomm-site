import React from 'react';
import { waitForElement } from 'react-testing-library';
import { renderWithStateMgmt } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

describe('<MainPage />', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithStateMgmt(<MainPage />);
    expect(getByText('Shopit')).not.toBeNull();
  });

  it('shows the product from API', async () => {
    const { getByText } = renderWithStateMgmt(<MainPage />);

    const iPhoneXBox = await waitForElement(() => getByText('iPhone X'));

    expect(iPhoneXBox).not.toBeNull();
  });
});
