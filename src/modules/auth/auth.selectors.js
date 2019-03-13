const selectAuthStore = state => state.auth;

export const selectAuthStatus = state => selectAuthStore(state).status;

export const selectUser = state => selectAuthStore(state).user;

export const selectAuthError = state => selectAuthStore(state).error;
