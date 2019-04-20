import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';
import App from './App';
import { renderWithMobXAndRouter } from './lib/test-util';

jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const renderResult = renderWithMobXAndRouter(<App />, {
    route: url
  });

  const { getByText, getByTestId } = renderResult;

  const getAddToCartBtn = () => getByText('Add To Cart');

  return {
    ...renderResult,
    addProductToCart: () => fireEvent.click(getAddToCartBtn()),
    waitForProductPageFinishLoading: () =>
      waitForElement(() => getAddToCartBtn()),
    getCartItemQty: id => getByTestId(`qty-for-${id}`).innerHTML
  };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getByText } = loadApp();

    expect(getByText('Shopit')).not.toBeNull();
  });

  it('show login form at login url', () => {
    const { getByLabelText, getByText } = loadApp({
      url: '/login'
    });

    expect(getByText('Login')).not.toBeNull();
    expect(getByLabelText('Email')).not.toBeNull();
  });

  it('show page not found for invalid url', () => {
    const { getByText } = loadApp({
      url: '/wulala-weird-url'
    });

    expect(getByText('Page Not Found')).not.toBeNull();
  });

  it('track product added to cart', async () => {
    const {
      waitForProductPageFinishLoading,
      addProductToCart,
      history,
      getCartItemQty
    } = loadApp({
      url: '/product/1'
    });

    await waitForProductPageFinishLoading();
    addProductToCart();

    await history.navigate('/product/2');

    await waitForProductPageFinishLoading();
    addProductToCart();
    addProductToCart();
    addProductToCart();

    await history.navigate('/cart');

    expect(getCartItemQty('1')).toBe('1');
    expect(getCartItemQty('2')).toBe('3');
  });
});
