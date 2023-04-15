import { ItemDebtors } from '@src/types/collection/debtsCollection';
import { UserDebtsDocument } from '@src/types/collection/users_debtsCollection';
import { db } from 'firbaseConfig';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const createEmptyDocument = async (username: string) => {
  const newUserDebtDocument = {
    debts: [],
    totalDebt: '0',
    receivables: [],
    totalReceivable: '0',
  } as UserDebtsDocument;

  await setDoc(doc(db, 'users_debts', `${username}`), newUserDebtDocument);
};

export const getUserDebtsByUsername = async (username: string) => {
  const userDebt = await getDoc(doc(db, 'users_debts', `${username}`)).then((res) => {
    return res.data();
  });

  if (userDebt) return userDebt as UserDebtsDocument;
  else {
    await createEmptyDocument(username);
  }
};

export const writeUserDebt = async (
  receipientUname: string,
  debtorUname: string,
  debtId: string,
  amount: string,
  prevListReceivables: string[],
  prevTotalAmountReceivables: number
) => {
  const debtorRef = await getUserDebtsByUsername(debtorUname);
  const totalDebt = debtorRef !== undefined ? parseInt(debtorRef?.totalDebt) + parseInt(amount) : parseInt(amount);

  const receipientPayload = {
    receivables: prevListReceivables,
    totalReceivable: prevTotalAmountReceivables.toString(),
  } as UserDebtsDocument;

  const debtorPayload = {
    debts: debtorRef !== undefined ? [debtId, ...debtorRef?.debts] : [debtId],
    totalDebt: totalDebt.toString(),
  } as UserDebtsDocument;

  await updateDoc(doc(db, 'users_debts', receipientUname), receipientPayload);
  await updateDoc(doc(db, 'users_debts', debtorUname), debtorPayload);
};

export const writeUserDebtDivide = async (
  receipientUname: string,
  debtId: string,
  debtors: ItemDebtors[],
  prevListReceivables: string[],
  prevTotalAmountReceivables: number
) => {
  const receipientPayload = {
    receivables: prevListReceivables,
    totalReceivable: prevTotalAmountReceivables.toString(),
  } as UserDebtsDocument;

  await updateDoc(doc(db, 'users_debts', receipientUname), receipientPayload);

  debtors.map(async (d) => {
    const debtorRef = await getUserDebtsByUsername(d.username);
    const totalDebt =
      debtorRef !== undefined ? parseInt(debtorRef?.totalDebt) + parseInt(d.totalAmount) : parseInt(d.totalAmount);

    const debtorPayload = {
      debts: debtorRef !== undefined ? [debtId, ...debtorRef?.debts] : [debtId],
      totalDebt: totalDebt.toString(),
    } as UserDebtsDocument;

    await updateDoc(doc(db, 'users_debts', d.username), debtorPayload);
  });
};
