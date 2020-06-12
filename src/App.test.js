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
  };
}

describe('<App />', () => {
  it('renders without crashing', () => {
    loadApp();

    expect(screen.getAllByText('Shopit').length).toBeGreaterThan(0);

    cleanup();
  });

  it('show login form at login url', () => {
    loadApp({
      url: '/login',
    });

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

    user.selectOptions(
      screen.getByLabelText('I want to make complain about'),
      'deliver'
    );
    user.click(screen.getByText('Next'));

    await user.type(
      screen.getByLabelText('Details about the incident'),
      'It take a year for the delivery to reach.'
    );
    user.click(screen.getByText('Next'));

    await user.type(screen.getByLabelText('Your Full Name'), 'Malcolm Key');
    user.click(screen.getByText('Submit'));

    cleanup();
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
    user.click(screen.getByText('Share'));
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

    cleanup();
  });

  it('default customer name in comment form', async () => {
    const { navigate, waitForProductPageFinishLoading, submitForm } = loadApp({
      url: '/login',
    });

    const $emailInput = await screen.findByLabelText('Email');

    await user.type($emailInput, 'mk@test.com');

    submitForm();

    await screen.findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(screen.getByLabelText('Your Name').value).not.toBe('');

    user.click(screen.getByText('Logout'));

    cleanup();
  });

  it(`can signup and logout`, async () => {
    const { container, navigate, waitForProductPageFinishLoading } = loadApp({
      url: '/signup',
    });

    const mockUser = {
      name: 'Malcolm Kee',
      email: 'mk@test.com',
      password: '12345678',
    };

    await screen.findByLabelText('Name');

    await user.type(screen.getByLabelText('Name'), mockUser.name);
    await user.type(screen.getByLabelText('Email'), mockUser.email);
    await user.type(screen.getByLabelText('Password'), mockUser.password);
    user.click(container.querySelector('button[type="submit"]'));

    await screen.findByTestId('login-form');
    await user.type(screen.getByLabelText('Email'), 'mk@test.com');
    await user.type(screen.getByLabelText('Password'), '12345678');
    user.click(screen.getByTestId('submit-login'));

    await screen.findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(screen.getByText('Logout')).not.toBeNull();
    expect(screen.queryByText('Login')).toBeNull();

    user.click(screen.getByText('Logout'));

    expect(screen.getByText('Login')).not.toBeNull();
    expect(screen.queryByText('Logout')).toBeNull();

    cleanup();
  });

  it(`can update user profile`, async () => {
    const { navigate, submitForm } = loadApp({
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

    user.click(screen.getByText('Logout'));
  });
});
