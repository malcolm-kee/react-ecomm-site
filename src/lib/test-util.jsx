import { configureStore } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { rootReducer } from '../modules/root-reducer';

export function renderWithStateMgmt(
  ui,
  {
    actions = [],
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
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
      <Router history={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>
    ),
  };
}

function wrapAct(action) {
  return function invokeAct(...args) {
    return act(() => action(...args));
  };
}

export const user = {
  click: wrapAct(userEvent.click),
  dblClick: wrapAct(userEvent.dblClick),
  /**
   * @type typeof userEvent.type
   */
  type: wrapAct(userEvent.type),
  selectOptions: wrapAct(userEvent.selectOptions),
  tab: wrapAct(userEvent.tab),
};
