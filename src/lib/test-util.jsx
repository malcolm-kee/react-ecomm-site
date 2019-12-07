import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { render } from '@testing-library/react';
import { Provider } from 'mobx-react';
import React from 'react';
import { AuthStore } from '../modules/auth/auth.store';
import { CartStore } from '../modules/cart/cart.store';
import { MarketingStore } from '../modules/marketing/marketing.store';
import { ProductStore } from '../modules/products/product.store';

export function renderWithStateMgmt(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
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
    ...render(
      <LocationProvider history={history}>
        <Provider
          auth={authStore}
          product={productStore}
          cart={cartStore}
          marketing={marketingStore}
        >
          {ui}
        </Provider>
      </LocationProvider>
    ),
  };
}
