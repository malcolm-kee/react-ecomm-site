import { cleanup, screen } from '@testing-library/react';
import * as React from 'react';
import xhrMock from 'xhr-mock';
import App from './App';
import { renderWithStateMgmtAndRouter, user } from './lib/test-util';
import { careers } from './modules/career/__mocks__/career.data';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const addToCartBtnLabel = 'Add To Cart';

  return {
    ...renderWithStateMgmtAndRouter(<App />, {
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
  };
}

describe('<App />', () => {
  beforeEach(() => {
    xhrMock.setup();
  });

  afterEach(() => {
    xhrMock.teardown();
  });

  it('renders without crashing', async () => {
    loadApp();

    await screen.findAllByText('Just Buy It.');

    expect(screen.getAllByText('Shopit').length).toBeGreaterThan(0);

    cleanup();
  });

  it('show login form at login url', () => {
    loadApp({
      url: '/login',
    });

    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Email')).not.toBeNull();

    cleanup();
  });

  it('shows signup page at signup url', () => {
    loadApp({
      url: '/signup',
    });

    expect(screen.getAllByText('Signup').length).toBeGreaterThan(0);
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
    const { getByText } = loadApp({
      url: '/wulala-weird-url',
    });

    expect(getByText('Page Not Found')).not.toBeNull();
  });

  it(`shows careers page`, async () => {
    xhrMock.get(process.env.REACT_APP_CAREER_BASE_URL, {
      status: 200,
      body: JSON.stringify(careers),
    });

    const webDesignerData = careers.find((job) => job.title === 'Web Designer');

    xhrMock.get(
      `${process.env.REACT_APP_CAREER_BASE_URL}/${webDesignerData._id}`,
      {
        status: 200,
        body: JSON.stringify(webDesignerData),
      }
    );

    const { getByText, findByText } = loadApp({
      url: '/',
    });

    user.click(getByText('Careers'));

    const careerPageTitle = await findByText('Careers in Shopit');
    expect(careerPageTitle).toBeVisible();

    const jobPost = await findByText(webDesignerData.title);
    user.click(jobPost);

    await findByText('Department:');

    cleanup();
  });

  it(`tracks product added to cart`, async () => {
    const {
      waitForProductPageFinishLoading,
      addQty,
      minusQty,
      addProductToCart,
      getCartItemQty,
      queryCartItem,
      addMoreCartItem,
      reduceCartItem,
      removeCartItem,
      navigate,
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

    user.click(screen.getByText('Cart'));

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
    const { navigate, container, waitForProductPageFinishLoading } = loadApp({
      url: '/login',
    });

    await screen.findByLabelText('Email');

    await user.type(screen.getByLabelText('Email'), 'mk@test.com');
    user.click(container.querySelector('button[type="submit"]'));

    await screen.findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(screen.getByLabelText('Your Name').value).not.toBe('');

    user.click(screen.getByText('Logout'));

    cleanup();
  });

  it(`can signup and logout`, async () => {
    const { navigate, container, waitForProductPageFinishLoading } = loadApp({
      url: '/signup',
    });

    await screen.findByLabelText('Name');

    await user.type(screen.getByLabelText('Name'), 'Malcolm Kee');
    await user.type(screen.getByLabelText('Email'), 'mk@test.com');
    await user.type(screen.getByLabelText('Password'), '12345678');
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
});
