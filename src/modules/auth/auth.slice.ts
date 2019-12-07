import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from './auth.type';

const DEFAULT_STATE: AuthState = {
  status: 'Authenticating',
  user: null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: DEFAULT_STATE,
  reducers: {
    authenticating: state => {
      state.error = '';
      state.status = 'Authenticating';
    },
    login: (state, action: PayloadAction<AuthUser>) => {
      state.error = '';
      state.status = 'Authenticated';
      state.user = action.payload;
    },
    logout: state => {
      state.error = '';
      state.status = 'Anonymous';
      state.user = null;
    },
    authError: (state, { payload }: PayloadAction<string | Error>) => {
      state.status = 'Anonymous';
      state.error = payload instanceof Error ? payload.message : payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
