import React from 'react';
import { waitForElement } from 'react-testing-library';
import { renderWithMobXAndRouter } from '../lib/test-util';
import { MainPage } from './main-page';

jest.mock('../modules/products/product.service');
jest.mock('../modules/marketing/marketing.service');

describe('<MainPage />', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithMobXAndRouter(<MainPage />);
    expect(getByText('Shopit')).not.toBeNull();
  });

  it('shows the product from API', async () => {
    const { getByText } = renderWithMobXAndRouter(<MainPage />);

    const iPhoneXBox = await waitForElement(() => getByText('iPhone X'));

    expect(iPhoneXBox).not.toBeNull();
  });
});
