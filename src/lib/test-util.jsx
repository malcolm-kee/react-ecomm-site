import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../modules/root-reducer';

export const renderWithStateMgmt = ui => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  return {
    ...renderResult,
    store,
  };
};
