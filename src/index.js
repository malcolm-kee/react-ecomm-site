import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './global.scss';
import { AuthStore } from './modules/auth/auth.store';
import { CartStore } from './modules/cart/cart.store';

configure({
  enforceActions: 'observed',
});

const authStore = new AuthStore();
const cartStore = new CartStore();

function renderApp(AppComponent) {
  return ReactDOM.render(
    <Provider auth={authStore} cart={cartStore}>
      <Router>
        <AppComponent />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

renderApp(App);

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
