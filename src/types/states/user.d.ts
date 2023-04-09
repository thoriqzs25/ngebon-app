export interface UserReducerState {
  email?: string | null;
  uid?: string | null;
  name?: string | null;
  username?: string | null;
}

export type UserReducerAction =
  | { type: 'SET_USER'; uid: string; email: string; name: string; username: string }
  | { type: 'REMOVE_USER' };
