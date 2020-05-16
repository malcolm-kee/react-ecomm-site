import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  ReactQueryConfigProvider,
  ReactQueryProviderConfig,
} from 'react-query';
import { Provider } from 'react-redux';
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
    queryConfig = {
      retry: false,
    },
  }: {
    actions?: AnyAction[];
    route?: string;
    queryConfig?: ReactQueryProviderConfig;
  } = {}
) {
  const store = configureStore({
    reducer: rootReducer,
  });
  actions.forEach((action) => store.dispatch(action));

  return {
    store,
    history,
    ...render(
      <ReactQueryConfigProvider config={queryConfig}>
        <Provider store={store}>{ui}</Provider>
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
  clear: wrapAct(userEvent.clear),
  selectOptions: wrapAct(userEvent.selectOptions),
  tab: wrapAct(userEvent.tab),
};
