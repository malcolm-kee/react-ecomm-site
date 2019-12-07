import { act, fireEvent, wait, waitForElement } from '@testing-library/react';
import React from 'react';
import App from './App';
import { renderWithStateMgmt } from './lib/test-util';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const renderResult = renderWithStateMgmt(<App />, {
    route: url,
  });

  const {
    getByText,
    getByTestId,
    queryByTestId,
    getByLabelText,
    container,
  } = renderResult;

  const getAddToCartBtn = () => getByText('Add To Cart');

  return {
    ...renderResult,
    addProductToCart: () => fireEvent.click(getAddToCartBtn()),
    waitForProductPageFinishLoading: () =>
      waitForElement(() => getAddToCartBtn()),
    addQty: () => fireEvent.click(getByTestId('add-qty-btn')),
    minusQty: () => fireEvent.click(getByTestId('reduce-qty-btn')),
    getCartItemQty: id => getByTestId(`qty-for-${id}`).innerHTML,
    queryCartItem: id => queryByTestId(`qty-for-${id}`),
    addMoreCartItem: id => fireEvent.click(getByTestId(`add-${id}`)),
    reduceCartItem: id => fireEvent.click(getByTestId(`reduce-${id}`)),
    removeCartItem: id => fireEvent.click(getByTestId(`remove-${id}`)),
    inputName: name =>
      fireEvent.change(getByLabelText('Name'), {
        target: { value: name },
      }),
    inputEmail: email =>
      fireEvent.change(getByLabelText('Email'), {
        target: { value: email },
      }),
    submitForm: () =>
      fireEvent.click(container.querySelector('button[type="submit"]')),
    logout: () => fireEvent.click(getByText('Logout')),
  };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getAllByText } = loadApp();

    expect(getAllByText('Shopit').length).toBeGreaterThan(0);
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
      waitForProductPageFinishLoading,
      inputEmail,
      submitForm,
      logout,
    } = loadApp({
      url: '/login',
    });

    await wait();

    inputEmail('mk@test.com');
    submitForm();

    await waitForElement(() => getByText("You're already login!"));

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByLabelText('Your Name').value).not.toBe('');

    logout();
  });

  it('can signup and logout', async () => {
    const {
      inputEmail,
      inputName,
      submitForm,
      history,
      getByText,
      queryByText,
      waitForProductPageFinishLoading,
      logout,
    } = loadApp({
      url: '/signup',
    });

    await wait();

    inputName('Malcolm Kee');
    inputEmail('mk@test.com');
    submitForm();

    await waitForElement(() => getByText("You're already login!"));

    await history.navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByText('Logout')).not.toBeNull();
    expect(queryByText('Login')).toBeNull();

    logout();

    expect(getByText('Login')).not.toBeNull();
    expect(queryByText('Logout')).toBeNull();
  });

  it('can update user profile', async () => {
    const {
      history,
      inputEmail,
      inputName,
      submitForm,
      logout,
      getByText,
    } = loadApp({
      url: '/login',
    });

    await wait();

    inputEmail('mk@test.com');
    submitForm();

    await waitForElement(() => getByText("You're already login!"));

    await history.navigate('/profile');

    inputName('Malcolm Key');
    submitForm();

    await waitForElement(() => getByText('Profile Updated.'));

    logout();
  });
});
