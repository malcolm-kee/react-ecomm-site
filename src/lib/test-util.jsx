import {
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';
import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'mobx-react';
import { AuthStore } from '../modules/auth/auth.store';
import { CartStore } from '../modules/cart/cart.store';
import { ProductStore } from '../modules/products/product.store';

export function renderWithMobXAndRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
  const authStore = new AuthStore();
  const productStore = new ProductStore();
  const cartStore = new CartStore(productStore);

  return {
    authStore,
    productStore,
    cartStore,
    history,
    ...render(
      <LocationProvider history={history}>
        <Provider auth={authStore} product={productStore} cart={cartStore}>
          {ui}
        </Provider>
      </LocationProvider>
    )
  };
}
