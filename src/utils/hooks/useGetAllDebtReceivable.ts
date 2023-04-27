import { DebtReceivableType } from '@src/types/collection/debtsCollection';
import { useCallback, useEffect, useState } from 'react';
import { getAllUserDebtReceivable } from '../collections/debtCollection';
import { useFocusEffect } from '@react-navigation/native';

const useGetAllDebtReceivable = (username: string) => {
  const [debts, setUserDebts] = useState<DebtReceivableType[]>([]);
  const [receivables, setUserReceivables] = useState<DebtReceivableType[]>([]);
  const [totalDebts, setTotalDebts] = useState<string>('');
  const [totalReceivables, setTotalReceivables] = useState<string>('');

  const getData = async (uname?: string) => {
    const data = await getAllUserDebtReceivable(!!uname ? uname : username);

    setTotalDebts(data.totalDebt);
    setTotalReceivables(data.totalReceivable);
    setUserDebts(data.debts);
    setUserReceivables(data.receivables);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return [debts, totalDebts, receivables, totalReceivables, getData] as [
    DebtReceivableType[],
    string,
    DebtReceivableType[],
    string,
    (uname?: string) => void
  ];
};

export default useGetAllDebtReceivable;
