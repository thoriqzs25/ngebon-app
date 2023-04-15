import TransactionCard from '@src/components/TransactionCard';
import CustomButton from '@src/components/input/CustomButton';
import { UserDebtsDocument } from '@src/types/collection/users_debtsCollection';
import { RootState } from '@src/types/states/root';
import { getDebtById, getReceivableById } from '@src/utils/collections/debtCollection';
import { getUserDebtsByUsername } from '@src/utils/collections/user_debtCollection';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { globalStyle } from '@src/utils/globalStyles';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

type DebtReceivable = {
  totalAmount: string;
  username: string;
};

const Records = () => {
  const { username } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState<'Debt' | 'Receivables'>('Debt');
  const [subTab, setSubTab] = useState<'On Going' | 'History'>('On Going');
  const [userDebts, setUserDebts] = useState<DebtReceivable[]>([]);
  const [userReceivables, setUserReceivables] = useState<DebtReceivable[]>([]);
  const [totalDebts, setTotalDebts] = useState<string>('');
  const [totalReceivables, setTotalReceivables] = useState<string>('');

  const getUserDebt = async () => {
    const data = await getUserDebtsByUsername(username!!);

    let _debts: Array<DebtReceivable> = [];
    let _receivables: Array<DebtReceivable> = [];

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

    setTotalDebts(data?.totalDebt ?? '0');
    setTotalReceivables(data?.totalReceivable ?? '0');
    setUserDebts(_debts);
    setUserReceivables(_receivables);
  };

  useEffect(() => {
    getUserDebt();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: moderateVerticalScale(120, -1.5) }}
        contentInsetAdjustmentBehavior='automatic'>
        <View style={[globalStyle.paddingHorizontal, IS_ANDROID && globalStyle.paddingTop]}>
          <Text style={[styles.pageTitle, { marginBottom: 20 }]}>Records</Text>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomButton
              text='Debt'
              style={[styles.button, { backgroundColor: tab === 'Debt' ? colours.greenNormal : colours.white }]}
              textStyle={[styles.textButton, { color: tab === 'Debt' ? colours.white : colours.greenNormal }]}
              onPress={() => setTab('Debt')}
            />
            <View style={styles.seperator} />
            <CustomButton
              text='Receivables'
              style={[styles.button, { backgroundColor: tab !== 'Debt' ? colours.greenNormal : colours.white }]}
              textStyle={[styles.textButton, { color: tab !== 'Debt' ? colours.white : colours.greenNormal }]}
              onPress={() => setTab('Receivables')}
            />
          </View>
          <View
            style={{
              padding: 20,
              paddingVertical: 32,
              width: '100%',
              marginVertical: 32,
              elevation: 6,
              borderRadius: 20,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowRadius: 4,
              shadowOpacity: 0.4,
              shadowColor: '#000',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: colours.white,
            }}>
            <Text
              style={[
                styles.dmBold,
                styles.title,
                { color: tab === 'Debt' ? colours.redNormal : colours.greenNormal },
              ]}>
              {tab === 'Debt' ? 'You Owe' : 'Amount Owed to You'}
            </Text>
            <Text
              style={[
                styles.dmBold,
                styles.amount,
                { color: tab === 'Debt' ? colours.redNormal : colours.greenNormal },
              ]}>
              Rp
              {tab === 'Debt'
                ? parseInt(totalDebts).toLocaleString('id-ID')
                : parseInt(totalReceivables).toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity activeOpacity={0.75} onPress={() => setSubTab('On Going')}>
              <Text style={[styles.subTab, { color: subTab === 'On Going' ? colours.greenNormal : colours.black }]}>
                On Going
              </Text>
            </TouchableOpacity>
            <View style={[styles.seperator, { height: 16, marginHorizontal: 8 }]} />
            <TouchableOpacity activeOpacity={0.75} onPress={() => setSubTab('History')}>
              <Text style={[styles.subTab, { color: subTab !== 'On Going' ? colours.greenNormal : colours.black }]}>
                History
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{}}>
            {tab === 'Debt' &&
              userDebts &&
              userDebts?.map((debt, idx) => {
                return (
                  <TransactionCard key={idx.toString()} name={debt.username} amount={debt.totalAmount} type='Debt' />
                );
              })}
            {tab === 'Receivables' &&
              userReceivables &&
              userReceivables?.map((rec, idx) => {
                return (
                  <TransactionCard
                    key={idx.toString()}
                    name={rec.username}
                    amount={rec.totalAmount}
                    type='Receivables'
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontFamily: 'dm-700',
    fontSize: 24,
    color: colours.greenNormal,
  },
  seperator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(99, 99, 102, 0.6)',
  },
  button: {
    width: '45%',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colours.greenNormal,
  },
  textButton: {
    fontSize: 14,
  },
  dmBold: {
    fontFamily: 'dm-700',
  },
  title: {
    fontSize: moderateScale(18, 2),
  },
  amount: {
    fontSize: moderateScale(30, 2),
  },
  subTab: {
    fontFamily: 'dm-500',
    fontSize: moderateScale(12, 2),
  },
});

export default Records;
