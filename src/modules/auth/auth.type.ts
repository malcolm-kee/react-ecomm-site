export type AuthStatus = 'Authenticating' | 'Authenticated' | 'Anonymous';

export type AuthUser = {
  userId: string;
  name: string;
  email: string;
  accessToken: string;
};

export type AuthState = {
  status: AuthStatus;
  user: null | AuthUser;
  error: string;
};
