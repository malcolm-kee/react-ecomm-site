import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from './auth.constants';

const DEFAULT_STATE = {
  status: AuthStatus.Authenticating,
  user: null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: DEFAULT_STATE,
  reducers: {
    authenticating: state => {
      state.error = '';
      state.status = AuthStatus.Authenticating;
    },
    login: (state, action) => {
      state.error = '';
      state.status = AuthStatus.Authenticated;
      state.user = action.payload;
    },
    logout: state => {
      state.error = '';
      state.status = AuthStatus.Anonymous;
      state.user = null;
    },
    authError: (state, { payload }) => {
      state.status = AuthStatus.Anonymous;
      state.error = payload instanceof Error ? payload.message : payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
