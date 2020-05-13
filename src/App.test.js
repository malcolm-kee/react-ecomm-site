import { cleanup } from '@testing-library/react';
import * as React from 'react';
import xhrMock from 'xhr-mock';
import App from './App';
import { renderWithStateMgmtAndRouter, user } from './lib/test-util';
import { careers } from './modules/career/__mocks__/career.data';

jest.mock('./modules/auth/auth.service');
jest.mock('./modules/marketing/marketing.service');
jest.mock('./modules/products/product.service');

function loadApp({ url = '/' } = {}) {
  const renderResult = renderWithStateMgmtAndRouter(<App />, {
    route: url,
  });

  const { getByText, getByTestId, queryByTestId, findByText } = renderResult;

  const addToCartBtnLabel = 'Add To Cart';

  return {
    ...renderResult,
    addProductToCart: () => user.click(getByText(addToCartBtnLabel)),
    waitForProductPageFinishLoading: () => findByText(addToCartBtnLabel),
    addQty: () => user.click(getByTestId('add-qty-btn')),
    minusQty: () => user.click(getByTestId('reduce-qty-btn')),
    getCartItemQty: (id) => getByTestId(`qty-for-${id}`).innerHTML,
    queryCartItem: (id) => queryByTestId(`qty-for-${id}`),
    addMoreCartItem: (id) => user.click(getByTestId(`add-${id}`)),
    reduceCartItem: (id) => user.click(getByTestId(`reduce-${id}`)),
    removeCartItem: (id) => user.click(getByTestId(`remove-${id}`)),
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
    const { getAllByText, findAllByText } = loadApp();

    await findAllByText('Just Buy It.');

    expect(getAllByText('Shopit').length).toBeGreaterThan(0);

    cleanup();
  });

  it('show login form at login url', () => {
    const { getByLabelText, getAllByText } = loadApp({
      url: '/login',
    });

    expect(getAllByText('Login').length).toBeGreaterThan(0);
    expect(getByLabelText('Email')).not.toBeNull();

    cleanup();
  });

  it('shows signup page at signup url', () => {
    const { getAllByText } = loadApp({
      url: '/signup',
    });

    expect(getAllByText('Signup').length).toBeGreaterThan(0);
    cleanup();
  });

  it(`shows help page at help url`, async () => {
    const { getByText, findByText, getByLabelText } = loadApp({
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

    user.selectOptions(
      getByLabelText('I want to make complain about'),
      'deliver'
    );
    user.click(getByText('Next'));

    await user.type(
      getByLabelText('Details about the incident'),
      'It take a year for the delivery to reach.'
    );
    user.click(getByText('Next'));

    await user.type(getByLabelText('Your Full Name'), 'Malcolm Key');
    user.click(getByText('Submit'));
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
    xhrMock.get(
      new RegExp('^' + process.env.REACT_APP_CAREER_BASE_URL + '\\?id='),
      {
        status: 200,
        body: JSON.stringify([careers[0]]),
      }
    );

    const { getByText, findByText } = loadApp({
      url: '/',
    });

    user.click(getByText('Careers'));

    const careerPageTitle = await findByText('Careers in Shopit');
    expect(careerPageTitle).toBeVisible();

    const jobPost = await findByText('Web Designer');
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
      findByTestId,
      findByText,
      getByText,
      getByLabelText,
    } = loadApp({
      url: '/product/1',
    });

    await waitForProductPageFinishLoading();
    user.click(getByText('Share'));
    addQty();
    addQty();
    minusQty();
    addProductToCart();

    navigate('/product/2');

    await waitForProductPageFinishLoading();
    addProductToCart();
    addProductToCart();
    addProductToCart();

    user.click(getByText('Cart'));

    await findByTestId('qty-for-2');

    expect(getCartItemQty('1')).toBe('2');
    expect(getCartItemQty('2')).toBe('3');

    addMoreCartItem('1');
    reduceCartItem('2');

    expect(getCartItemQty('1')).toBe('3');
    expect(getCartItemQty('2')).toBe('2');

    removeCartItem('1');

    expect(queryCartItem('1')).toBeNull();
    expect(queryCartItem('2')).not.toBeNull();

    user.click(getByText('Check Out'));

    await user.type(getByLabelText('Card Number'), '5521783746553547');
    await user.type(getByLabelText('Name'), 'Malcolm Kee');
    await user.type(getByLabelText('Valid Thru'), '05/22');
    await user.type(getByLabelText('CVC'), '123');
    user.click(getByText('Pay'));
    await findByText('Paid');

    cleanup();
  });

  it('default customer name in comment form', async () => {
    const {
      navigate,
      getByLabelText,
      getByText,
      findByText,
      findByLabelText,
      container,
      waitForProductPageFinishLoading,
    } = loadApp({
      url: '/login',
    });

    await findByLabelText('Email');

    await user.type(getByLabelText('Email'), 'mk@test.com');
    user.click(container.querySelector('button[type="submit"]'));

    await findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByLabelText('Your Name').value).not.toBe('');

    user.click(getByText('Logout'));

    cleanup();
  });

  it('can signup and logout', async () => {
    const {
      navigate,
      getByLabelText,
      container,
      getByText,
      findByText,
      findByLabelText,
      queryByText,
      waitForProductPageFinishLoading,
    } = loadApp({
      url: '/signup',
    });

    await findByLabelText('Name');

    await user.type(getByLabelText('Name'), 'Malcolm Kee');
    await user.type(getByLabelText('Email'), 'mk@test.com');
    user.click(container.querySelector('button[type="submit"]'));

    await findByText("You're already login!");

    navigate('/product/1');

    await waitForProductPageFinishLoading();

    expect(getByText('Logout')).not.toBeNull();
    expect(queryByText('Login')).toBeNull();

    user.click(getByText('Logout'));

    expect(getByText('Login')).not.toBeNull();
    expect(queryByText('Logout')).toBeNull();

    cleanup();
  });
});
