import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { configureStore } from '../config/configure-store';

export function renderWithRedux(ui, { actions = [] } = {}) {
  const store = configureStore();
  actions.forEach(action => store.dispatch(action));

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>)
  };
}
