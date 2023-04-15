import { RecordReducerState } from '@src/types/states/record';
import { DebtDocument, ItemDebtors } from '@src/types/collection/debtsCollection';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'firbaseConfig';
import { getUserDebtsByUsername, writeUserDebt, writeUserDebtDivide } from './user_debtCollection';
import { DivideReducerState, ItemDivide } from '@src/types/states/divide';
import { UserDebtsDocument } from '@src/types/collection/users_debtsCollection';

export const createRecordDebt = async (recordRedux: RecordReducerState) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  recordRedux.records?.map(async (r) => {
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

export const createDivideDebt = async (divideRedux: DivideReducerState, recordRedux: RecordReducerState) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  let _debtors: ItemDebtors[] = [];

  divideRedux.assignedFriends?.map(async (fr) => {
    let _items: ItemDivide[] = [];
    let _totalPrice: number = 0;
    fr.selectedItem.map((itm) => {
      const _item = divideRedux.items!![itm];
      _totalPrice += _item.pricePerUser!!;
      _items.push(_item);
    });

    totalAmountForReceivables += _totalPrice;

    const itemDebtors = {
      username: fr.user.username,
      totalAmount: _totalPrice.toString(),
      items: _items,
    } as ItemDebtors;

    _debtors.push(itemDebtors);
  });

  const payload = {
    divideDebt: {
      debtors: _debtors,
    },
    receipient: recordRedux.receipient,
  } as DebtDocument;

  const collectionRef = collection(db, 'debts');
  const newDocRef = doc(collectionRef);
  const newDocId = newDocRef.id;

  await setDoc(doc(db, 'debts', `divide_${newDocId}`), payload).then(async () => {
    listForReceivables.push(`divide_${newDocId}`);

    await writeUserDebtDivide(
      recordRedux.receipient?.username!!,
      `divide_${newDocId}`,
      _debtors,
      listForReceivables,
      totalAmountForReceivables
    );
  });
};

export const getDebtById = async (debtId: string, username: string) => {
  const debtType = debtId.split('_')[0];

  const data = (await getDoc(doc(db, 'debts', `${debtId}`)).then((res) => {
    return res.data();
  })) as DebtDocument;

  if (debtType === 'record') {
    const _debts = data.recordDebt;

    return {
      totalAmount: _debts?.totalAmount,
      username: data.receipient?.username,
    } as { totalAmount: string; username: string };
  }

  if (debtType === 'divide') {
    const _debts = data.divideDebt;
    let _totalAmount: string = '';

    _debts?.debtors.map((dts) => {
      if (dts.username === username) _totalAmount = dts.totalAmount;
    });

    return {
      totalAmount: _totalAmount,
      username: data.receipient?.username,
    } as { totalAmount: string; username: string };
  }
};

export const getReceivableById = async (debtId: string, username: string) => {
  const debtType = debtId.split('_')[0];

  const data = (await getDoc(doc(db, 'debts', `${debtId}`)).then((res) => {
    return res.data();
  })) as DebtDocument;

  if (debtType === 'record') {
    const _debts = data.recordDebt;

    return [
      {
        totalAmount: _debts?.totalAmount,
        username: _debts?.username,
      },
    ] as { totalAmount: string; username: string }[];
  }

  if (debtType === 'divide') {
    const _debts = data.divideDebt;
    // let _totalAmount: string = '';
    let _receivables: { totalAmount: string; username: string }[] = [];

    _debts?.debtors.map((dts) => {
      _receivables.push({ totalAmount: dts.totalAmount, username: dts.username });
    });

    return _receivables as { totalAmount: string; username: string }[];
  }
};
