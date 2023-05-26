import { RouteProp } from '@react-navigation/native';
import CustomButton from '@src/components/input/CustomButton';
import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import UserCardMoney from '@src/components/UserCardMoney';
import UserCardMoneyDivide from '@src/components/UserCardMoneyDivide';
import { navigate } from '@src/navigation';
import { Payment } from '@src/types/collection/usersCollection';
import { AssignFriend, ItemDivide } from '@src/types/states/divide';
import { ItemRecord, UserRecord } from '@src/types/states/record';
import { RootState } from '@src/types/states/root';
import { createDivideDebt, createRecordDebt } from '@src/utils/collections/debtCollection';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

type AssignedFriendWithTaxService = AssignFriend & {
  taxToPay: number;
  serviceToPay: number;
};

const ActionsConfirmation = ({ route }: { route: RouteProp<{ params: { page: string } }> }) => {
  const { receipient, selectedPayments, records, requireProof } = useSelector((state: RootState) => state.record);
  const {
    assignedFriends: af,
    items: divide,
    tax,
    service,
    totalAmountOfDivide,
  } = useSelector((state: RootState) => state.divide);
  const { record, divide: divideRedux } = useSelector((state: RootState) => state);

  const [userDetail, setUserDetail] = useState<UserRecord>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [itemRecords, setItemRecords] = useState<ItemRecord[]>([]);
  const [itemDivides, setItemDivides] = useState<ItemDivide[]>([]);
  const [assignedFriends, setAssignedFriends] = useState<AssignedFriendWithTaxService[]>([]);

  useEffect(() => {
    if (receipient) {
      setUserDetail(receipient);
    }
  }, [receipient]);

  useEffect(() => {
    if (selectedPayments) {
      setPayments(selectedPayments);
    }
  }, [selectedPayments]);

  useEffect(() => {
    if (records) {
      setItemRecords(records);
    }
  }, [records]);

  useEffect(() => {
    if (divide) {
      setItemDivides(divide);
    }
  }, [divide]);

  useEffect(() => {
    if (af && divide) {
      let _af: AssignedFriendWithTaxService[] = [];
      console.log('line 77', tax, service);
      af.map((item, idx) => {
        let total = 0;
        item.selectedItem.map((item) => {
          // console.log('line 81', item.itemIdx);
          total += (item.parts / divide[item.itemIdx].fullParts!!) * divide[item.itemIdx].totalPrice;
        });
        const payload = {
          ...item,
          taxToPay: parseInt(((tax!! * total) / totalAmountOfDivide!!).toFixed(0)),
          serviceToPay: parseInt(((service!! * total) / totalAmountOfDivide!!).toFixed(0)),
        } as AssignedFriendWithTaxService;
        _af.push(payload);
      });
      // console.log('line 90', _af);
      setAssignedFriends(_af);
    }
  }, [af, divide]);

  const handleConfirm = () => {
    if (route.params.page === 'Record') createRecordDebt(record);
    if (route.params.page === 'Divide')
      createDivideDebt(divideRedux, record, tax ?? 0, service ?? 0, totalAmountOfDivide ?? 0);
    navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            {route.params?.page ? (route.params?.page === 'Divide' ? 'Divide (7/7)' : 'Record (5/5)') : ''}
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Confirmation
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Confirm your debts
          </Text>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ paddingBottom: moderateVerticalScale(40, -1.5) }}
            showsVerticalScrollIndicator={false}>
            {itemRecords &&
              route.params.page === 'Record' &&
              itemRecords.map((item, idx) => {
                return <UserCardMoney key={idx.toString()} user={item.user} amount={item.amount} note={item.note} />;
              })}
            {assignedFriends &&
              route.params.page === 'Divide' &&
              assignedFriends.map((item, idx) => {
                return (
                  <UserCardMoneyDivide
                    key={idx.toString()}
                    user={item.user}
                    items={itemDivides}
                    selectedItem={item.selectedItem}
                    tax={item.taxToPay ?? 0}
                    service={item.serviceToPay ?? 0}
                  />
                );
              })}
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>
              Pay To
            </Text>
            {userDetail && <UserCard user={userDetail} />}
            {payments &&
              payments.map((pm: Payment, idx: number) => {
                return <PaymentCard key={idx.toString()} type={pm.bankName} number={pm.number} name={pm.name} />;
              })}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={[styles.dmFont, { fontSize: moderateScale(10, 2) }]}>
                {requireProof ? '*Proof required' : '*No proof required'}
              </Text>
            </View>
            <CustomButton
              text='Next'
              style={{
                borderRadius: 12,
                paddingVertical: 16,
                width: '50%',
                alignSelf: 'center',
                marginTop: IS_ANDROID ? 8 : 20,
              }}
              onPress={handleConfirm}
            />
          </ScrollView>
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
  button: {
    width: 160,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
});

export default ActionsConfirmation;
