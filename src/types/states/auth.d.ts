export interface AuthReducerState {
  email?: string | null;
  uid?: string | null;
  loggedIn?: boolean | null;
}

export type AuthReducerAction =
  | { type: 'CURRENT_USER'; uid: string; email: string }
  | { type: 'USER_LOGIN' }
  | { type: 'USER_LOGOUT' };
