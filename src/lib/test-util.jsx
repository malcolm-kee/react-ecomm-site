import { configureStore } from '@reduxjs/toolkit';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { rootReducer } from '../modules/root-reducer';

export function renderWithStateMgmtAndRouter(
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
  actions.forEach((action) => store.dispatch(action));

  return {
    store,
    history,
    navigate: (to) => {
      act(() => {
        history.push(to);
      });
    },
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
  /**
   * @type typeof userEvent.click
   */
  click: wrapAct(userEvent.click),
  /**
   * @type typeof userEvent.dblClick
   */
  dblClick: wrapAct(userEvent.dblClick),
  /**
   * @type typeof userEvent.type
   */
  type: wrapAct(userEvent.type),
  /**
   * @type typeof userEvent.selectOptions
   */
  selectOptions: wrapAct(userEvent.selectOptions),
  /**
   * @type typeof userEvent.tab
   */
  tab: wrapAct(userEvent.tab),
};
