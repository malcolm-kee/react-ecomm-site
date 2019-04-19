import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configure } from 'mobx';
import DevTools from 'mobx-react-devtools';
import { Provider as MobxProvider } from 'mobx-react';
import { AuthStore } from './modules/auth/auth.store';
import { ProductStore } from './modules/products/product.store';
import { configureStore } from './config/configure-store';
import App from './App';

configure({
  enforceActions: 'observed'
});

const auth = new AuthStore();
const product = new ProductStore();

const store = configureStore();

function renderApp(AppComponent) {
  return ReactDOM.render(
    <>
      <MobxProvider auth={auth} product={product}>
        <Provider store={store}>
          <AppComponent />
        </Provider>
      </MobxProvider>
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
