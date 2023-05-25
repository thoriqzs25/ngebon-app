import { ItemRecord, RecordReducerState } from '@src/types/states/record';
import {
  DebtData,
  DebtDoc,
  DebtDocument,
  DebtReceivableType,
  ItemDebtors,
  RecordDebtDocument,
} from '@src/types/collection/debtsCollection';
import { Timestamp, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firbaseConfig';
import { getUserDebtsByUsername, writeUserDebt, writeUserDebtDivide } from './user_debtCollection';
import { DivideReducerState, ItemDivide } from '@src/types/states/divide';

export const createRecordDebt = async (recordRedux: RecordReducerState) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  recordRedux.records?.map(async (r) => {
    const { user, amount, note } = r;
    const _amount: string = amount.replace(/\./g, '');

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

    if (payload.recordDebt?.totalAmount && parseInt(payload.recordDebt?.totalAmount) > 0) {
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
    }
  });
};

export const createDivideDebt = async (
  divideRedux: DivideReducerState,
  recordRedux: RecordReducerState,
  tax: number,
  service: number,
  totalAmountOfDivide: number
) => {
  const receipientUser = await getUserDebtsByUsername(recordRedux.receipient?.username!!);

  let listForReceivables: string[] = receipientUser ? [...receipientUser?.receivables!!] : [];
  let totalAmountForReceivables: number = receipientUser ? parseInt(receipientUser?.totalReceivable) : 0;

  let _debtors: ItemDebtors[] = [];

  divideRedux.assignedFriends?.map(async (fr) => {
    let _items: ItemDivide[] = [];
    let _totalPrice: number = 0;
    let _taxToPay: number = 0;
    let _serviceToPay: number = 0;

    fr.selectedItem.map((itm) => {
      const _item = divideRedux.items!![itm.itemIdx];
      _totalPrice +=
        (itm.parts / divideRedux.items!![itm.itemIdx].fullParts!!) * divideRedux.items!![itm.itemIdx].totalPrice;
      // (item.parts / items[item.itemIdx].fullParts) * items[item.itemIdx].totalPrice;
      _items.push({ ..._item, parts: itm.parts });
    });

    totalAmountForReceivables += _totalPrice;
    _taxToPay = tax * (_totalPrice / totalAmountOfDivide);
    _serviceToPay = service * (_totalPrice / totalAmountOfDivide);

    _totalPrice = _totalPrice + _taxToPay + _serviceToPay;

    const itemDebtors = {
      username: fr.user.username,
      totalAmount: _totalPrice.toFixed(0).toString(),
      items: _items,
      status: 'requesting',
      taxToPay: _taxToPay.toFixed(0).toString(),
      serviceToPay: _serviceToPay.toFixed(0).toString(),
    } as ItemDebtors;

    //CAUTION
    if (_totalPrice > 0) _debtors.push(itemDebtors);
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

export const getDebtByIdReturnDebt = async (debtId: string, username: string) => {
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

export const getReceivableByIdReturnReceivable = async (debtId: string, username: string) => {
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
        const data = await getDebtByIdReturnDebt(debt, username!!);
        if (data) _debts.push(data);
      })
    );

  if (data?.receivables)
    await Promise.all(
      data?.receivables.map(async (rec, idx) => {
        const data = await getReceivableByIdReturnReceivable(rec, username!!);
        if (data) _receivables = [...data, ..._receivables];
      })
    );

  // NEED TO FIND ANOTHER APPROACH
  let _finishedTotalDebt: number = 0;
  let _finishedTotalReceivable: number = 0;
  _debts.map((d) => {
    if (d.status === 'confirmed' || d.status === 'declined') _finishedTotalDebt += parseInt(d.totalAmount);
  });
  _receivables.map((d) => {
    if (d.status === 'confirmed' || d.status === 'declined') _finishedTotalReceivable += parseInt(d.totalAmount);
  });
  // ^^^

  return {
    totalDebt: (parseInt(data?.totalDebt ?? '0') - _finishedTotalDebt).toString(),
    debts: _debts,
    totalReceivable: (parseInt(data?.totalReceivable ?? '0') - _finishedTotalReceivable).toString(),
    receivables: _receivables,
  };
};

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

export const getDebtByIdReturnData = async (id: string, username: string) => {
  const type = id.split('_')[0];
  let data: DebtData;

  const res = (await getDoc(doc(db, 'debts', `${id}`)).then((res) => res.data())) as DebtDocument;

  const date = res.createdAt as Timestamp;
  if (type === 'record') {
    data = {
      createdAt: date.toDate(),
      receipient: res.receipient,
      totalAmount: res.recordDebt?.totalAmount ?? '0',
      username: username,
      status: res.recordDebt?.status ?? '',
      notes: res.recordDebt?.note ?? '',
    };
    return data;
  }

  if (type === 'divide') {
    let _totalAmount: string = '';
    let _items: ItemDivide[] = [];
    let _status: string = '';
    let _taxToPay: string = '';
    let _serviceToPay: string = '';

    res.divideDebt?.debtors.map((dbt) => {
      if (dbt.username === username) {
        _totalAmount = dbt.totalAmount;
        _items = [...dbt.items];
        _status = dbt.status;
        _taxToPay = dbt.taxToPay;
        _serviceToPay = dbt.serviceToPay;
      }
    });

    data = {
      createdAt: date.toDate(),
      receipient: res.receipient,
      totalAmount: _totalAmount,
      username: username,
      status: _status,
      items: _items,
      taxToPay: _taxToPay,
      serviceToPay: _serviceToPay,
    };
    return data;
  }
};
