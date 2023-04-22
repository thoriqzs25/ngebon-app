import { FieldValue, Timestamp } from 'firebase/firestore';
import { ItemDivide } from '../states/divide';
import { UserDocument } from './usersCollection';

export type DebtDocument = {
  recordDebt?: RecordDebtDocument;
  divideDebt?: DivideDebtDocument;
  receipient: UserDocument;
  createdAt: string | Timestamp;
};

export type RecordDebtDocument = {
  username: string;
  totalAmount: string;
  note: string;
  status: string; //requesting | waiting | declined | confirming | confirmed
};

export type DivideDebtDocument = {
  debtors: ItemDebtors[];
};

export type ItemDebtors = {
  username: string;
  totalAmount: string;
  items: ItemDivide[];
  status: string;
};

export type DebtReceivableType = {
  totalAmount: string;
  username: string;
  createdAt: Date;
  type: string;
  status?: string;
};
