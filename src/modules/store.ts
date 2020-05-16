import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createWrapper } from 'next-redux-wrapper';

export const initStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(initStore);
