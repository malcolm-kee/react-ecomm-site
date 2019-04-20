import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthStore } from './modules/auth/auth.store';
import { CartStore } from './modules/cart/cart.store';
import { ProductStore } from './modules/products/product.store';

configure({
  enforceActions: 'observed'
});

const authStore = new AuthStore();
const productStore = new ProductStore();
const cartStore = new CartStore(productStore);

function renderApp(AppComponent) {
  return ReactDOM.render(
    <Provider auth={authStore} product={productStore} cart={cartStore}>
      <AppComponent />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
