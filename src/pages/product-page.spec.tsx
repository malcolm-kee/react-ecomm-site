import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { renderWithStateMgmtAndRouter, user } from '../lib/test-util';
import { ProductPage } from './product-page';

jest.mock('../modules/products/product.service');

describe('<ProductPage />', () => {
  it('allows customer to add product to cart', async () => {
    renderWithStateMgmtAndRouter(<ProductPage productId="1" />);

    const addToCartBtn = await screen.findByText('Add To Cart');

    user.click(addToCartBtn);
  });

  it('allows customer to add comment', async () => {
    renderWithStateMgmtAndRouter(<ProductPage productId="1" />);

    await screen.findByLabelText('Your Name');

    await user.type(screen.getByLabelText('Your Name'), 'Malcolm Kee');
    await user.type(screen.getByLabelText('Your Review'), 'I like it.');

    user.click(screen.getByTestId('product-comment-submit-btn'));

    await waitFor(() =>
      expect(screen.getByLabelText('Your Name')).toHaveFocus()
    );
  });
});
