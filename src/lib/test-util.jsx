import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { AuthStore } from '../modules/auth/auth.store';
import { CartStore } from '../modules/cart/cart.store';
import { ProductStore } from '../modules/products/product.store';

export function renderWithQuery(ui, config = {}) {
  return render(
    <ReactQueryConfigProvider
      config={{
        retry: false,
        ...config,
      }}
    >
      {ui}
    </ReactQueryConfigProvider>
  );
}

export function renderWithStateMgmt(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    queryConfig = {
      retry: false,
    },
  } = {}
) {
  const authStore = new AuthStore();
  const productStore = new ProductStore();
  const cartStore = new CartStore(productStore);

  return {
    authStore,
    productStore,
    cartStore,
    history,
    navigate: (to) =>
      act(() => {
        history.push(to);
      }),
    ...render(
      <ReactQueryConfigProvider config={queryConfig}>
        <Router history={history}>
          <Provider auth={authStore} product={productStore} cart={cartStore}>
            {ui}
          </Provider>
        </Router>
      </ReactQueryConfigProvider>
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
