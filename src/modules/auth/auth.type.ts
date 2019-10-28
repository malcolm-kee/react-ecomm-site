export type AuthStatus = 'Authenticating' | 'Authenticated' | 'Anonymous';

export type ValueOf<T> = T[keyof T];

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  joinedDate: number;
};

export type AuthState = {
  status: AuthStatus;
  user: null | AuthUser;
  error: string;
};
