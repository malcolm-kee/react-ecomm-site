import { wait } from '@testing-library/react';
import * as React from 'react';
import { renderWithStateMgmtAndRouter, user } from '../lib/test-util';
import { ProductPage } from './product-page';

jest.mock('../modules/products/product.service');

describe('<ProductPage />', () => {
  it('allows customer to add product to cart', async () => {
    const { findByText } = renderWithStateMgmtAndRouter(
      <ProductPage productId="1" />
    );

    const addToCartBtn = await findByText('Add To Cart');

    user.click(addToCartBtn);

    await wait(); // to suppress act() warning
  });

  it('allows customer to add comment', async () => {
    const {
      findByLabelText,
      getByLabelText,
      getByTestId,
    } = renderWithStateMgmtAndRouter(<ProductPage productId="1" />);

    await findByLabelText('Your Name');

    await user.type(getByLabelText('Your Name'), 'Malcolm Kee');
    await user.type(getByLabelText('Your Review'), 'I like it.');

    user.click(getByTestId('product-comment-submit-btn'));

    await wait(); // to suppress act() warning
  });
});
