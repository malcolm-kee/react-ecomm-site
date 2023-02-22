import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
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
  return createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppComponent />
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

renderApp(App);
