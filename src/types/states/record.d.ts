import { Payment, UserDocument } from '../collection/usersCollection';

export interface RecordReducerState {
  receipient: UserRecord | null;
  records: ItemRecord[] | null;
  selectedPayments: Payment[] | null;
  requireProof: boolean | null;
}

export type ItemRecord = {
  user: UserRecord;
  amount: string;
  note: string;
};

export type UserRecord = {
  payments: Payment[] | [];
  avatar?: string;
  email: string;
  name: string;
  username: string;
};

export type RecordReducerAction =
  | { type: 'SET_RECORDS'; records: ItemRecord[] }
  | { type: 'SET_RECEIPIENT'; receipient: UserRecord }
  | { type: 'SET_SELECTED_PAYMENTS'; payments: Payment[]; proof: boolean };
