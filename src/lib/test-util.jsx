import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import React from 'react';
import { Router } from 'react-router-dom';
import { AuthStore } from '../modules/auth/auth.store';
import { CartStore } from '../modules/cart/cart.store';
import { MarketingStore } from '../modules/marketing/marketing.store';
import { ProductStore } from '../modules/products/product.store';

export function renderWithStateMgmt(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
  } = {}
) {
  const authStore = new AuthStore();
  const productStore = new ProductStore();
  const cartStore = new CartStore(productStore);
  const marketingStore = new MarketingStore();

  return {
    authStore,
    productStore,
    cartStore,
    marketingStore,
    history,
    navigate: to =>
      act(() => {
        history.push(to);
      }),
    ...render(
      <Router history={history}>
        <Provider
          auth={authStore}
          product={productStore}
          cart={cartStore}
          marketing={marketingStore}
        >
          {ui}
        </Provider>
      </Router>
    ),
  };
}

function wrapAct(action) {
  return function invokeAct(...args) {
    return act(() => action(...args));
  };
}

export const user = {
  click: wrapAct(userEvent.click),
  dblClick: wrapAct(userEvent.dblClick),
  /**
   * @type typeof userEvent.type
   */
  type: wrapAct(userEvent.type),
  selectOptions: wrapAct(userEvent.selectOptions),
  tab: wrapAct(userEvent.tab),
};
