import { RecordReducerState } from '@src/types/states/record';
import { DebtDocument } from '@src/types/collection/debtsCollection';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from 'firbaseConfig';
import { getUserDebtsByUsername, writeUserDebt } from './user_debtCollection';

export const createRecordDebt = async (recordRedux: RecordReducerState) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  recordRedux.records?.map(async (r, idx) => {
    const { user, amount, note } = r;
    const _amount: string = amount.replace('.', '');

    const payload = {
      recordDebt: {
        username: user.username,
        totalAmount: _amount,
        note: note,
      },
      receipient: recordRedux.receipient,
    } as DebtDocument;

    const collectionRef = collection(db, 'debts');
    const newDocRef = doc(collectionRef);
    const newDocId = newDocRef.id;

    await setDoc(doc(db, 'debts', `record_${newDocId}`), payload).then(async () => {
      listForReceivables.push(`record_${newDocId}`);
      totalAmountForReceivables += parseInt(_amount);

      await writeUserDebt(
        recordRedux.receipient?.username!!,
        user.username,
        `record_${newDocId}`,
        _amount,
        listForReceivables,
        totalAmountForReceivables
      );
    });
  });
};
