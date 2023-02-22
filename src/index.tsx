import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import App from './App';
import './global.scss';
import { rootReducer } from './modules/root-reducer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

const store = configureStore({
  reducer: rootReducer,
});

function renderApp(AppComponent: typeof App) {
  return ReactDOM.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppComponent />
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
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
