import React from 'react';
import { fireEvent, wait, waitForElement } from 'react-testing-library';
import App from './App';
import { renderWithStateMgmt } from './lib/test-util';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const renderResult = renderWithStateMgmt(<App />, {
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

  it('shows signup page at signup url', () => {
    const { getByText } = loadApp({
      url: '/signup'
    });

    expect(getByText('Signup')).not.toBeNull();
  });

  it('show page not found for invalid url', () => {
    const { getByText } = loadApp({
      url: '/wulala-weird-url'
    });

    expect(getByText('Page Not Found')).not.toBeNull();
  });

  it('tracks product added to cart', async () => {
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

  it('default customer name in comment form', async () => {
    const {
      history,
      getByLabelText,
      getByText,
      container,
      waitForProductPageFinishLoading
    } = loadApp({
      url: '/login'
    });

    await wait();

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'mk@test.com' }
    });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    await waitForElement(() => getByText("You're already login!"));

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByLabelText('Your Name').value).not.toBe('');

    fireEvent.click(getByText('Logout'));
  });

  it('can signup and logout', async () => {
    const {
      getByLabelText,
      container,
      history,
      getByText,
      queryByText,
      waitForProductPageFinishLoading
    } = loadApp({
      url: '/signup'
    });

    await wait();

    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'Malcolm Kee' }
    });
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'mk@test.com' }
    });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    await waitForElement(() => getByText("You're already login!"));

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByText('Logout')).not.toBeNull();
    expect(queryByText('Login')).toBeNull();

    fireEvent.click(getByText('Logout'));

    expect(getByText('Login')).not.toBeNull();
    expect(queryByText('Logout')).toBeNull();
  });
});
