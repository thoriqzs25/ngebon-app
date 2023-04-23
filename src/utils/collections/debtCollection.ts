import { ItemRecord, RecordReducerState } from '@src/types/states/record';
import {
  DebtDocument,
  DebtReceivableType,
  ItemDebtors,
  RecordDebtDocument,
} from '@src/types/collection/debtsCollection';
import { Timestamp, collection, doc, getDoc, orderBy, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firbaseConfig';
import { getUserDebtsByUsername, writeUserDebt, writeUserDebtDivide } from './user_debtCollection';
import { DivideReducerState, ItemDivide } from '@src/types/states/divide';
import { UserDebtsDocument } from '@src/types/collection/users_debtsCollection';
import { ref } from 'firebase/storage';
import { storage } from 'firbaseConfig';

export const createRecordDebt = async (recordRedux: RecordReducerState) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  recordRedux.records?.map(async (r) => {
    const { user, amount, note } = r;
    const _amount: string = amount.replace('.', '');

    const recordDoc = {
      username: user.username,
      totalAmount: _amount,
      note: note,
      status: 'requesting',
    } as RecordDebtDocument;

    const payload = {
      recordDebt: recordDoc,
      receipient: recordRedux.receipient,
      createdAt: serverTimestamp(),
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
      status: 'requesting',
    } as ItemDebtors;

    _debtors.push(itemDebtors);
  });

  const payload = {
    divideDebt: {
      debtors: _debtors,
    },
    receipient: recordRedux.receipient,
    createdAt: serverTimestamp(),
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
  type ReturnDebt = {
    totalAmount: string;
    username: string;
    createdAt: Date;
    type: string;
    status: string;
    debtId: string;
  };

  const debtType = debtId.split('_')[0];

  const data = (await getDoc(doc(db, 'debts', `${debtId}`)).then((res) => {
    return res.data();
  })) as DebtDocument;

  const date = data.createdAt as Timestamp;
  if (debtType === 'record') {
    const _debts = data.recordDebt;

    return {
      totalAmount: _debts?.totalAmount,
      username: data.receipient?.username,
      createdAt: date.toDate(),
      type: 'Debt',
      status: _debts?.status,
      debtId: debtId,
    } as ReturnDebt;
  }

  if (debtType === 'divide') {
    const _debts = data.divideDebt;
    let _totalAmount: string = '';
    let _status: string = '';

    _debts?.debtors.map((dts) => {
      if (dts.username === username) {
        _totalAmount = dts.totalAmount;
        _status = dts.status;
      }
    });

    return {
      totalAmount: _totalAmount,
      username: data.receipient?.username,
      createdAt: date.toDate(),
      type: 'Debt',
      status: _status,
      debtId: debtId,
    } as ReturnDebt;
  }
};

export const getReceivableById = async (debtId: string, username: string) => {
  type ReturnReceivable = {
    totalAmount: string;
    username: string;
    createdAt: Date;
    type: string;
    status: string;
    debtId: string;
  };
  const debtType = debtId.split('_')[0];

  const data = (await getDoc(doc(db, 'debts', `${debtId}`)).then((res) => {
    return res.data();
  })) as DebtDocument;

  const date = data.createdAt as Timestamp;
  if (debtType === 'record') {
    const _debts = data.recordDebt;

    return [
      {
        totalAmount: _debts?.totalAmount,
        username: _debts?.username,
        createdAt: date.toDate(),
        type: 'Receivable',
        status: _debts?.status,
        debtId: debtId,
      },
    ] as ReturnReceivable[];
  }

  if (debtType === 'divide') {
    const _debts = data.divideDebt;
    // let _totalAmount: string = '';
    let _receivables: ReturnReceivable[] = [];

    _debts?.debtors.map((dts) => {
      _receivables.push({
        totalAmount: dts.totalAmount,
        username: dts.username,
        createdAt: date.toDate(),
        type: 'Receivable',
        status: dts?.status,
        debtId: debtId,
      });
    });

    return _receivables as ReturnReceivable[];
  }
};

export const getAllUserDebtReceivable = async (username: string) => {
  const data = await getUserDebtsByUsername(username!!);

  let _debts: Array<DebtReceivableType> = [];
  let _receivables: Array<DebtReceivableType> = [];

  if (data?.debts)
    await Promise.all(
      data?.debts.map(async (debt, idx) => {
        const data = await getDebtById(debt, username!!);
        if (data) _debts.push(data);
      })
    );

  if (data?.receivables)
    await Promise.all(
      data?.receivables.map(async (rec, idx) => {
        const data = await getReceivableById(rec, username!!);
        if (data) _receivables = [...data, ..._receivables];
      })
    );

  return {
    totalDebt: data?.totalDebt,
    debts: _debts,
    totalReceivable: data?.totalReceivable,
    receivables: _receivables,
  };
};

// export const acceptRequest = async (debtId: string, username: string) => {
//   const _types = debtId.split('_')[0];

//   if (_types === 'record') {
//     await updateDoc(doc(db, 'debts', `${debtId}`), {
//       'recordDebt.status': 'waiting',
//     });
//   }

//   if (_types === 'divide') {
//     await updateDivideStatus(debtId, username, 'waiting');
//   }
// };

export const updateStatus = async (debtId: string, username: string, status: string) => {
  const _types = debtId.split('_')[0];

  if (_types === 'record') {
    await updateDoc(doc(db, 'debts', `${debtId}`), {
      'recordDebt.status': status,
    });
  }

  if (_types === 'divide') {
    await updateDivideStatus(debtId, username, status);
  }
};

const updateDivideStatus = async (debtId: string, username: string, status: string) => {
  const debtDoc = (await getDoc(doc(db, 'debts', `${debtId}`)).then((res) => res.data())) as DebtDocument;

  debtDoc.divideDebt?.debtors.map((debtor) => {
    if (debtor.username === username) debtor.status = status;
  });

  const _debtors = debtDoc.divideDebt?.debtors;
  const _newDebtors = _debtors ? [..._debtors] : [];

  await updateDoc(doc(db, 'debts', `${debtId}`), {
    'divideDebt.debtors': _newDebtors,
  });
};
