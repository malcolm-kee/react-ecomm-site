import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { rootReducer } from '../modules/root-reducer';

export function renderWithRouter(ui) {
  return render(<Router>{ui}</Router>);
}

export function renderWithStateMgmt(ui, { initialActions = [] } = {}) {
  const store = configureStore({
    reducer: rootReducer,
  });

  initialActions.forEach((action) => store.dispatch(action));

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
