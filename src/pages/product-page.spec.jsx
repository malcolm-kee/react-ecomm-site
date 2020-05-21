import { screen, wait } from '@testing-library/react';
import * as React from 'react';
import { renderWithStateMgmt, user } from '../lib/test-util';
import { ProductPage } from './product-page';

jest.mock('../modules/products/product.service');

describe('<ProductPage />', () => {
  function loadProductPage() {
    return renderWithStateMgmt(<ProductPage productId="1" />);
  }

  it('allows customer to add product to cart', async () => {
    loadProductPage();

    const addToCartBtn = await screen.findByText('Add To Cart');

    user.click(addToCartBtn);
  });

  it('allows customer to add comment', async () => {
    loadProductPage();

    await user.type(await screen.findByLabelText('Your Name'), 'Malcolm Kee');
    await user.type(screen.getByLabelText('Your Review'), 'I like it');

    user.click(screen.getByTestId('product-comment-submit-btn'));

    await wait(); // to suppress act() warning, I have no idea I am doing actually.
  });
});
