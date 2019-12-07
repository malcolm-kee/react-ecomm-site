import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../modules/root-reducer';

export function renderWithStateMgmt(
  ui,
  {
    actions = [],
    route = '/',
    history = createHistory(createMemorySource(route)),
  } = {}
) {
  const store = configureStore({
    reducer: rootReducer,
  });
  actions.forEach(action => store.dispatch(action));

  return {
    store,
    history,
    ...render(
      <LocationProvider history={history}>
        <Provider store={store}>{ui}</Provider>
      </LocationProvider>
    ),
  };
}
