import { configureStore } from '@reduxjs/toolkit';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ToastContainer } from './components/toast';
import './global.scss';
import { rootReducer } from './modules/root-reducer';

const reactQueryConfig = {
  staleTime: 5000,
};

const store = configureStore({
  reducer: rootReducer,
});

function renderApp(AppComponent) {
  return ReactDOM.render(
    <Provider store={store}>
      <ReactQueryConfigProvider config={reactQueryConfig}>
        <Router>
          <AppComponent />
          <ToastContainer hideProgressBar />
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
}
