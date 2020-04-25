import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import {
  ReactQueryConfigProvider,
  ReactQueryProviderConfig,
} from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { rootReducer } from '../modules/root-reducer';

export function renderWithQuery(
  ui: React.ReactNode,
  config: ReactQueryProviderConfig = {}
) {
  return render(
    <ReactQueryConfigProvider
      config={{
        retry: false,
        ...config,
      }}
    >
      {ui}
    </ReactQueryConfigProvider>
  );
}

export function renderWithStateMgmtAndRouter(
  ui: React.ReactNode,
  {
    actions = [],
    route = '/',
    queryConfig = {
      retry: false,
    },
  }: {
    actions?: AnyAction[];
    route?: string;
    queryConfig?: ReactQueryProviderConfig;
  } = {}
) {
  const history = createMemoryHistory({
    initialEntries: [route],
  });
  const store = configureStore({
    reducer: rootReducer,
  });
  actions.forEach((action) => store.dispatch(action));

  return {
    store,
    history,
    navigate: (to: string) => {
      act(() => {
        history.push(to);
      });
    },
    ...render(
      <ReactQueryConfigProvider config={queryConfig}>
        <Router history={history}>
          <Provider store={store}>{ui}</Provider>
        </Router>
      </ReactQueryConfigProvider>
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
  selectOptions: wrapAct(userEvent.selectOptions),
  tab: wrapAct(userEvent.tab),
};
