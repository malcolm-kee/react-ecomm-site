import { RootState } from '../../type';

const selectAuthStore = (state: RootState) => state.auth;

export const selectAuthStatus = (state: RootState) =>
  selectAuthStore(state).status;

export const selectUser = (state: RootState) => selectAuthStore(state).user;

export const selectAuthError = (state: RootState) =>
  selectAuthStore(state).error;
