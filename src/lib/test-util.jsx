import {
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import { rootReducer } from '../modules/root-reducer';

export function renderWithStateMgmt(
  ui,
  {
    actions = [],
    route = '/',
    history = createHistory(createMemorySource(route))
  } = {}
) {
  const store = configureStore({
    reducer: rootReducer
  });
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
