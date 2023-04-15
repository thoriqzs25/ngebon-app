import { ItemDivide } from '../states/divide';
import { UserDocument } from './usersCollection';

export type DebtDocument = {
  recordDebt?: RecordDebtDocument;
  divideDebt?: DivideDebtDocument;
  receipient: UserDocument;
};

export type RecordDebtDocument = {
  username: string;
  totalAmount: string;
  note: string;
};

export type DivideDebtDocument = {
  debtors: ItemDebtors[];
};

export type ItemDebtors = {
  username: string;
  totalAmount: string;
  items: ItemDivide[];
};
