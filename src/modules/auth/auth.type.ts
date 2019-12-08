export type AuthStatus = 'Authenticating' | 'Authenticated' | 'Anonymous';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  joinedDate: number;
  profileImage?: string;
};

export type AuthState = {
  status: AuthStatus;
  user: null | AuthUser;
  error: string;
};
