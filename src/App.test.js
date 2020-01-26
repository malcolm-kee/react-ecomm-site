import { act, fireEvent, wait, waitForElement } from '@testing-library/react';
import React from 'react';
import App from './App';
import { renderWithStateMgmt, user } from './lib/test-util';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const renderResult = renderWithStateMgmt(<App />, {
    route: url,
  });

  const { getByText, getByTestId, queryByTestId } = renderResult;

  const getAddToCartBtn = () => getByText('Add To Cart');

  return {
    ...renderResult,
    addProductToCart: () => user.click(getAddToCartBtn()),
    waitForProductPageFinishLoading: () =>
      waitForElement(() => getAddToCartBtn()),
    addQty: () => user.click(getByTestId('add-qty-btn')),
    minusQty: () => user.click(getByTestId('reduce-qty-btn')),
    getCartItemQty: id => getByTestId(`qty-for-${id}`).innerHTML,
    queryCartItem: id => queryByTestId(`qty-for-${id}`),
    addMoreCartItem: id => user.click(getByTestId(`add-${id}`)),
    reduceCartItem: id => user.click(getByTestId(`reduce-${id}`)),
    removeCartItem: id => user.click(getByTestId(`remove-${id}`)),
  };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getAllByText } = loadApp();

    expect(getAllByText('Shopit').length).toBeGreaterThan(0);
  });

  it('show login form at login url', () => {
    const { getByLabelText, getAllByText } = loadApp({
      url: '/login',
    });

    expect(getAllByText('Login').length).toBeGreaterThan(0);
    expect(getByLabelText('Email')).not.toBeNull();
  });

  it('shows signup page at signup url', () => {
    const { getAllByText } = loadApp({
      url: '/signup',
    });

    expect(getAllByText('Signup').length).toBeGreaterThan(0);
  });

  it(`shows help page at help url`, async () => {
    const { getByText, findByText } = loadApp({
      url: '/help',
    });

    user.click(getByText('Account'));
    await findByText('If you forget password, just create another one.');

    user.click(getByText('Payment'));
    await findByText(
      `Seriously u look for help for payment when you can't even pay?`
    );

    user.click(getByText('Shipping'));
    await findByText(
      'All shipping will be delivered within 3-5 years. Please be patient.'
    );

    user.click(getByText('Complaint'));
    await findByText('Make a Complaint');
  });

  it('show page not found for invalid url', () => {
    const { getByText } = loadApp({
      url: '/wulala-weird-url',
    });

    expect(getByText('Page Not Found')).not.toBeNull();
  });

  it('tracks product added to cart', async () => {
    const {
      waitForProductPageFinishLoading,
      addQty,
      minusQty,
      addProductToCart,
      history,
      getCartItemQty,
      queryCartItem,
      addMoreCartItem,
      reduceCartItem,
      removeCartItem,
    } = loadApp({
      url: '/product/1',
    });

    await waitForProductPageFinishLoading();
    addQty();
    addQty();
    minusQty();
    addProductToCart();

    await act(() => history.navigate('/product/2'));

    await waitForProductPageFinishLoading();
    addProductToCart();
    addProductToCart();
    addProductToCart();

    await act(() => history.navigate('/cart'));

    expect(getCartItemQty('1')).toBe('2');
    expect(getCartItemQty('2')).toBe('3');

    addMoreCartItem('1');
    reduceCartItem('2');

    expect(getCartItemQty('1')).toBe('3');
    expect(getCartItemQty('2')).toBe('2');

    removeCartItem('1');

    expect(queryCartItem('1')).toBeNull();
    expect(queryCartItem('2')).not.toBeNull();
  });

  it('default customer name in comment form', async () => {
    const {
      history,
      getByLabelText,
      getByText,
      findByText,
      container,
      waitForProductPageFinishLoading,
    } = loadApp({
      url: '/login',
    });

    await wait();

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'mk@test.com' },
    });
    user.click(container.querySelector('button[type="submit"]'));

    await findByText("You're already login!");

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByLabelText('Your Name').value).not.toBe('');

    user.click(getByText('Logout'));
  });

  it('can signup and logout', async () => {
    const {
      getByLabelText,
      container,
      history,
      getByText,
      findByText,
      queryByText,
      waitForProductPageFinishLoading,
    } = loadApp({
      url: '/signup',
    });

    await wait();

    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'Malcolm Kee' },
    });
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'mk@test.com' },
    });
    user.click(container.querySelector('button[type="submit"]'));

    await findByText("You're already login!");

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByText('Logout')).not.toBeNull();
    expect(queryByText('Login')).toBeNull();

    user.click(getByText('Logout'));

    expect(getByText('Login')).not.toBeNull();
    expect(queryByText('Logout')).toBeNull();
  });
});
