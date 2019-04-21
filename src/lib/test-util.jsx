import {
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';
import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { configureStore } from '../config/configure-store';

export function renderWithStateMgmt(
  ui,
  {
    actions = [],
    route = '/',
    history = createHistory(createMemorySource(route))
  } = {}
) {
  const store = configureStore();
  actions.forEach(action => store.dispatch(action));

  return {
    store,
    history,
    ...render(
      <LocationProvider history={history}>
        <Provider store={store}>{ui}</Provider>
      </LocationProvider>
    )
  };
}
