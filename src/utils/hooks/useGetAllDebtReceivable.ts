import { DebtReceivableType } from '@src/types/collection/debtsCollection';
import { useCallback, useState } from 'react';
import { getAllUserDebtReceivable, updateStatus } from '../collections/debtCollection';
import { useFocusEffect } from '@react-navigation/native';

const useGetAllDebtReceivable = (username: string) => {
  const [debts, setUserDebts] = useState<DebtReceivableType[]>([]);
  const [receivables, setUserReceivables] = useState<DebtReceivableType[]>([]);
  const [totalDebts, setTotalDebts] = useState<string>('');
  const [totalReceivables, setTotalReceivables] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async (uname?: string) => {
    setIsLoading(true);
    try {
      const data = await getAllUserDebtReceivable(!!uname ? uname : username);

      setTotalDebts(data.totalDebt);
      setTotalReceivables(data.totalReceivable);
      setUserDebts(data.debts);
      setUserReceivables(data.receivables);
    } catch {
      __DEV__ && console.log('line 24');
    } finally {
      setIsLoading(false);
    }
  };

  const updateDebtReceivableStatus = async ({
    type,
    status,
    debtId,
    itemsUsername,
    userUsername,
  }: {
    type: string;
    status: string;
    debtId: string;
    itemsUsername?: string;
    userUsername?: string;
  }) => {
    setIsLoading(true);
    try {
      if (type === 'Receivable') await updateStatus(debtId, itemsUsername!!, status);
      else await updateStatus(debtId, userUsername!!, status);

      await getData();
    } catch {
      __DEV__ && console.log('line 37');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [username])
  );

  return [debts, totalDebts, receivables, totalReceivables, isLoading, getData, updateDebtReceivableStatus] as [
    DebtReceivableType[],
    string,
    DebtReceivableType[],
    string,
    boolean,
    (uname?: string) => void,
    ({
      type,
      status,
      debtId,
      itemsUsername,
      userUsername,
    }: {
      type: string;
      status: string;
      debtId: string;
      itemsUsername?: string;
      userUsername?: string;
    }) => void
  ];
};

export default useGetAllDebtReceivable;
