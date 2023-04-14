import { Payment } from './../collection/usersCollection.d';
export interface UserReducerState {
  email?: string | null;
  uid?: string | null;
  name?: string | null;
  username?: string | null;
  avatar?: string | null;
  payments?: Payment[] | [] | null;
}

export type UserReducerAction =
  | {
      type: 'SET_USER';
      uid: string;
      email: string;
      name: string;
      username: string;
      avatar: string;
      payments?: Payment[] | [];
    }
  | { type: 'SET_AVATAR'; avatar: string }
  | { type: 'SET_PAYMENTS'; payments: Payment[] }
  | { type: 'REMOVE_USER' };
