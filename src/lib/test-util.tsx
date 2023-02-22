import { AnyAction, configureStore } from '@reduxjs/toolkit';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from '../components/toast';
import { rootReducer } from '../modules/root-reducer';

export function renderWithQuery(
  ui: React.ReactNode,
  config: QueryClientConfig = {}
) {
  const queryClient = new QueryClient({
    ...config,
    defaultOptions: {
      ...(config.defaultOptions || {}),
      queries: {
        retry: false,
        ...((config.defaultOptions && config.defaultOptions.queries) || {}),
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

export function renderWithStateMgmtAndRouter(
  ui: React.ReactNode,
  {
    actions = [],
    route = '/',
    queryConfig = {
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    },
  }: {
    actions?: AnyAction[];
    route?: string;
    queryConfig?: QueryClientConfig;
  } = {}
) {
  const history = createMemoryHistory({
    initialEntries: [route],
  });
  const store = configureStore({
    reducer: rootReducer,
  });
  actions.forEach((action) => store.dispatch(action));

  const queryClient = new QueryClient(queryConfig);

  return {
    store,
    history,
    navigate: (to: string) => {
      act(() => {
        history.push(to);
      });
    },
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <Provider store={store}>{ui}</Provider>
        </Router>
        <ToastContainer />
      </QueryClientProvider>
    ),
  };
}

function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => Promise<void>
): (...args: Arg) => Promise<undefined>;
function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => void
): (...args: Arg) => void;
function wrapAct<Arg extends any[]>(action: (...args: Arg) => any) {
  return function invokeAct(...args: Arg) {
    return act(() => action(...args));
  };
}

export const user = {
  click: wrapAct(userEvent.click),
  dblClick: wrapAct(userEvent.dblClick),
  type: wrapAct(userEvent.type),
  clear: wrapAct(userEvent.clear),
  selectOptions: wrapAct(userEvent.selectOptions),
  tab: wrapAct(userEvent.tab),
};
