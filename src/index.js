import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { rootReducer } from './modules/root-reducer';
import './global.scss';

const store = configureStore({
  reducer: rootReducer,
});

function renderApp(AppComponent) {
  return ReactDOM.render(
    <Provider store={store}>
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

  module.hot.accept('./modules/root-reducer', () => {
    const nextReducer = require('./modules/root-reducer').rootReducer;
    store.replaceReducer(nextReducer);
  });
}
