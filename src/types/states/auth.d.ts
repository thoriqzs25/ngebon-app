export interface AuthReducerState {
  email?: string | null;
  token?: string | null;
  loggedIn?: boolean | null;
}

export type AuthReducerAction =
  | { type: 'USER_LOGIN'; token: string; email: string; phone: string }
  | { type: 'USER_LOGOUT' };
