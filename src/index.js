import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthStore } from './modules/auth/auth.store';
import { CartStore } from './modules/cart/cart.store';
import { ProductStore } from './modules/products/product.store';

configure({
  enforceActions: 'observed'
});

const auth = new AuthStore();
const product = new ProductStore();
const cart = new CartStore();

function renderApp(AppComponent) {
  return ReactDOM.render(
    <>
      <Provider auth={auth} product={product} cart={cart}>
        <AppComponent />
      </Provider>
      <DevTools />
    </>,
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
