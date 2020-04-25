import { configureStore } from '@reduxjs/toolkit';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { Provider } from 'react-redux';
import App from './App';
import { rootReducer } from './modules/root-reducer';
import './global.scss';

const reactQueryConfig = {
  staleTime: 5000,
};

const store = configureStore({
  reducer: rootReducer,
});

function renderApp(AppComponent: typeof App) {
  return ReactDOM.render(
    <Provider store={store}>
      <ReactQueryConfigProvider config={reactQueryConfig}>
        <Router>
          <AppComponent />
        </Router>
      </ReactQueryConfigProvider>
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

  module.hot.accept('./modules/root-reducer', () => {
    const nextReducer = require('./modules/root-reducer').rootReducer;
    store.replaceReducer(nextReducer);
  });
}
