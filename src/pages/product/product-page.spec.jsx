import { wait } from '@testing-library/react';
import { renderWithStateMgmtAndRouter, user } from 'lib/test-util';
import * as React from 'react';
import ProductPage from './[productId]';
import { useRouter } from 'next/router';

/**
 * @type {jest.MockedFunction<typeof useRouter>}
 */
const useRouterMock = useRouter;

jest.mock('modules/products/product.service');

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {},
  })),
}));

describe('<ProductPage />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('allows customer to add product to cart', async () => {
    useRouterMock.mockImplementation(() => ({
      query: {
        productId: '1',
      },
    }));

    const { findByText } = renderWithStateMgmtAndRouter(<ProductPage />);

    const addToCartBtn = await findByText('Add To Cart');

    user.click(addToCartBtn);

    await wait(); // to suppress act() warning
  });

  it('allows customer to add comment', async () => {
    useRouterMock.mockImplementation(() => ({
      query: {
        productId: '1',
      },
    }));
    const {
      findByLabelText,
      getByLabelText,
      getByTestId,
    } = renderWithStateMgmtAndRouter(<ProductPage />);

    await findByLabelText('Your Name');

    await user.type(getByLabelText('Your Name'), 'Malcolm Kee');
    await user.type(getByLabelText('Your Review'), 'I like it.');

    user.click(getByTestId('product-comment-submit-btn'));

    await wait(); // to suppress act() warning
  });
});
