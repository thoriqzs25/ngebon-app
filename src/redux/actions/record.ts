import { Payment } from '@src/types/collection/usersCollection';
import { ItemRecord, UserRecord } from '@src/types/states/record';

export const setRecords = ({ records }: { records: ItemRecord[] }) => ({
  type: 'SET_RECORDS',
  records: records,
});

export const setReceipient = ({ receipient }: { receipient: UserRecord }) => ({
  type: 'SET_RECEIPIENT',
  receipient: receipient,
});

export const setSelectedPayments = ({ payments, proof }: { payments: Payment[]; proof: boolean }) => ({
  type: 'SET_SELECTED_PAYMENTS',
  payments: payments,
  proof: proof,
});
