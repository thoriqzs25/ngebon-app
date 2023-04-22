import { RouteProp, useFocusEffect } from '@react-navigation/native';
import TransactionCard from '@src/components/TransactionCard';
import CustomButton from '@src/components/input/CustomButton';
import { DebtReceivableType } from '@src/types/collection/debtsCollection';
import { UserDebtsDocument } from '@src/types/collection/users_debtsCollection';
import { RootState } from '@src/types/states/root';
import { getAllUserDebtReceivable, getDebtById, getReceivableById } from '@src/utils/collections/debtCollection';
import { getUserDebtsByUsername } from '@src/utils/collections/user_debtCollection';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { globalStyle } from '@src/utils/globalStyles';
import useGetAllDebtReceivable from '@src/utils/hooks/useGetAllDebtReceivable';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const Records = ({ route }: { route: RouteProp<{ params: { tab?: 'Debts' | 'Receivables' } }> }) => {
  const { username } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState<'Debts' | 'Receivables'>(route?.params?.tab ?? 'Debts');
  const [subTab, setSubTab] = useState<'On Going' | 'History'>('On Going');

  const [userDebts, totalDebts, userReceivables, totalReceivables] = useGetAllDebtReceivable(username!!);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.tab) setTab(route?.params?.tab);
    }, [route?.params?.tab])
  );

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
              text='Debts'
              style={[styles.button, { backgroundColor: tab === 'Debts' ? colours.greenNormal : colours.white }]}
              textStyle={[styles.textButton, { color: tab === 'Debts' ? colours.white : colours.greenNormal }]}
              onPress={() => setTab('Debts')}
            />
            <View style={styles.seperator} />
            <CustomButton
              text='Receivables'
              style={[styles.button, { backgroundColor: tab !== 'Debts' ? colours.greenNormal : colours.white }]}
              textStyle={[styles.textButton, { color: tab !== 'Debts' ? colours.white : colours.greenNormal }]}
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
                { color: tab === 'Debts' ? colours.redNormal : colours.greenNormal },
              ]}>
              {tab === 'Debts' ? 'You Owe' : 'Amount Owed to You'}
            </Text>
            <Text
              style={[
                styles.dmBold,
                styles.amount,
                { color: tab === 'Debts' ? colours.redNormal : colours.greenNormal },
              ]}>
              Rp
              {tab === 'Debts'
                ? totalDebts.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                : totalReceivables.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
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
            {tab === 'Debts' &&
              userDebts &&
              userDebts?.map((debt, idx) => {
                return (
                  <TransactionCard
                    key={idx.toString()}
                    name={debt.username}
                    amount={debt.totalAmount}
                    date={debt.createdAt}
                    type='Debt'
                    status={debt.status}
                  />
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
                    date={rec.createdAt}
                    type='Receivable'
                    status={rec.status}
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
