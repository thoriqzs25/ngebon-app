export interface AuthReducerState {
  email?: string | null;
  uid?: string | null;
  loggedIn?: boolean | null;
}

export type AuthReducerAction = { type: 'USER_LOGIN'; uid: string; email: string } | { type: 'USER_LOGOUT' };
