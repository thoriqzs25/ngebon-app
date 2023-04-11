import { FieldValue } from 'firebase/firestore';

export type UserDocument = {
  avatar?: string;
  createdAt?: FieldValue;
  email: string;
  name: string;
  username: string;
  payments: Payment[] | [];
};

export type Payment = {
  name: string;
  number: string;
};