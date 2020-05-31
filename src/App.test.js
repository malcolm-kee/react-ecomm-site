import { cleanup, screen } from '@testing-library/react';
import * as React from 'react';
import App from './App';
import { renderWithStateMgmt, user } from './lib/test-util';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');
jest.mock('./modules/career/career.service');

function loadApp({ url = '/' } = {}) {
  const addToCartBtnLabel = 'Add To Cart';

  return {
    ...renderWithStateMgmt(<App />, {
      route: url,
    }),
    addProductToCart: () => user.click(screen.getByText(addToCartBtnLabel)),
    waitForProductPageFinishLoading: () => screen.findByText(addToCartBtnLabel),
    addQty: () => user.click(screen.getByTestId('add-qty-btn')),
    minusQty: () => user.click(screen.getByTestId('reduce-qty-btn')),
    getCartItemQty: (id) => screen.getByTestId(`qty-for-${id}`).innerHTML,
    queryCartItem: (id) => screen.queryByTestId(`qty-for-${id}`),
    addMoreCartItem: (id) => user.click(screen.getByTestId(`add-${id}`)),
    reduceCartItem: (id) => user.click(screen.getByTestId(`reduce-${id}`)),
    removeCartItem: (id) => user.click(screen.getByTestId(`remove-${id}`)),
    submitForm: () =>
      user.click(document.querySelector('button[type="submit"]')),
    logout: () => user.click(screen.getByText('Logout')),
  };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getAllByText } = loadApp();

    expect(getAllByText('Shopit').length).toBeGreaterThan(0);

    cleanup();
  });

  it(`shows help page at help url`, async () => {
    loadApp({
      url: '/help',
    });

    user.click(screen.getByText('Account'));
    await screen.findByText('If you forget password, just create another one.');

    user.click(screen.getByText('Payment'));
    await screen.findByText(
      `Seriously u look for help for payment when you can't even pay?`
    );

    user.click(screen.getByText('Shipping'));
    await screen.findByText(
      'All shipping will be delivered within 3-5 years. Please be patient.'
    );

    user.click(screen.getByText('Complaint'));
    await screen.findByText('Make a Complaint');
  });

  it('show page not found for invalid url', () => {
    loadApp({
      url: '/wulala-weird-url',
    });

    expect(screen.getByText('Page Not Found')).not.toBeNull();
  });

  it(`shows careers page`, async () => {
    loadApp({
      url: '/',
    });

    user.click(screen.getByText('Careers'));

    const careerPageTitle = await screen.findByText('Careers in Shopit');
    expect(careerPageTitle).toBeVisible();

    const jobPost = await screen.findByText('Web Designer');
    user.click(jobPost);

    await screen.findByText('Department:');

    cleanup();
  });

  it(`tracks product added to cart`, async () => {
    const {
      waitForProductPageFinishLoading,
      addQty,
      minusQty,
      addProductToCart,
      navigate,
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

    navigate('/product/2');

    await waitForProductPageFinishLoading();
    addProductToCart();
    addProductToCart();
    addProductToCart();

    navigate('/cart');
    await screen.findByTestId('qty-for-2');

    expect(getCartItemQty('1')).toBe('2');
    expect(getCartItemQty('2')).toBe('3');

    addMoreCartItem('1');
    reduceCartItem('2');

    expect(getCartItemQty('1')).toBe('3');
    expect(getCartItemQty('2')).toBe('2');

    removeCartItem('1');

    expect(queryCartItem('1')).toBeNull();
    expect(queryCartItem('2')).not.toBeNull();

    user.click(screen.getByText('Check Out'));

    await user.type(screen.getByLabelText('Card Number'), '5521783746553547');
    await user.type(screen.getByLabelText('Name'), 'Malcolm Kee');
    await user.type(screen.getByLabelText('Valid Thru'), '05/22');
    await user.type(screen.getByLabelText('CVC'), '123');
    user.click(screen.getByText('Pay'));
    await screen.findByText('Paid');
  });

  it('default customer name in comment form', async () => {
    const {
      navigate,
      waitForProductPageFinishLoading,
      submitForm,
      logout,
    } = loadApp({
      url: '/login',
    });

    const $emailInput = await screen.findByLabelText('Email');

    await user.type($emailInput, 'mk@test.com');

    submitForm();

    await screen.findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(screen.getByLabelText('Your Name').value).not.toBe('');

    logout();
  });

  it('can signup and logout', async () => {
    const {
      submitForm,
      navigate,
      getByText,
      queryByText,
      waitForProductPageFinishLoading,
      logout,
    } = loadApp({
      url: '/signup',
    });

    await screen.findByLabelText('Email');

    await user.type(screen.getByLabelText('Name'), 'Malcolm Kee');
    await user.type(screen.getByLabelText('Email'), 'mk@test.com');

    submitForm();

    await screen.findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByText('Logout')).not.toBeNull();
    expect(queryByText('Login')).toBeNull();

    logout();

    expect(getByText('Login')).not.toBeNull();
    expect(queryByText('Logout')).toBeNull();
  });

  it(`can update user profile`, async () => {
    const { navigate, submitForm, logout } = loadApp({
      url: '/login',
    });

    const $emailInput = await screen.findByLabelText('Email');

    await user.type($emailInput, 'mk@test.com');
    submitForm();

    await screen.findByText("You're already login!");

    navigate('/profile');

    await user.type(screen.getByLabelText('Name'), 'Malcolm Key');
    submitForm();

    await screen.findByText('Profile Updated.');

    logout();
  });
});
