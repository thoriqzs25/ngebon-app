import { RouteProp } from '@react-navigation/native';
import CustomButton from '@src/components/input/CustomButton';
import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { navigate } from '@src/navigation';
import { setSelectedPayments } from '@src/redux/actions/record';
import { store } from '@src/redux/store';
import { Payment } from '@src/types/collection/usersCollection';
import { UserRecord } from '@src/types/states/record';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import useBoolean from '@src/utils/hooks/useBoolean';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const ActionsPaymentDetails = ({ route }: { route: RouteProp<{ params: { page: string } }> }) => {
  const { receipient } = useSelector((state: RootState) => state.record);

  const { value: required, setValue: setRequired } = useBoolean(false);

  const [userDetail, setUserDetail] = useState<UserRecord>();
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleCheck = (index: number, isChecked: boolean) => {
    if (isChecked && !checkedItems.includes(index)) {
      setCheckedItems([...checkedItems, index]);
    } else if (!isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    }
  };

  const handleNext = () => {
    const selectedPayments: Payment[] = [];
    checkedItems.sort((a, b) => a - b);
    checkedItems.map((num) => {
      selectedPayments.push(userDetail!!.payments[num]);
    });

    // if (route.params.page === 'Record') {
    store.dispatch(setSelectedPayments({ payments: selectedPayments, proof: required }));
    navigate('ActionsConfirmation', { page: route.params.page });
    // }
  };

  useEffect(() => {
    if (receipient) {
      setUserDetail(receipient);
    }
  }, [receipient]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            {route.params?.page ? (route.params?.page === 'Divide' ? 'Divide (6/7)' : 'Record (4/5)') : ''}
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Payment Details
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Select payment method
          </Text>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ paddingBottom: moderateVerticalScale(160, -1.5) }}
            showsVerticalScrollIndicator={false}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>
              Pay To
            </Text>
            {userDetail && <UserCard user={userDetail} />}

            <Text style={[styles.dmBold, { fontSize: moderateScale(15, 2), marginTop: 4 }]}>Payment Method</Text>
            <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
              Select one or more
            </Text>
            {userDetail?.payments &&
              userDetail.payments.map((pm: Payment, idx: number) => {
                return (
                  <PaymentCard
                    key={idx.toString()}
                    type={pm.bankName}
                    withCheckbox={true}
                    isChecked={checkedItems.includes(idx)}
                    onCheckChanged={(isChecked: boolean) => handleCheck(idx, isChecked)}
                    number={pm.number}
                    name={pm.name}
                  />
                );
              })}
            {userDetail?.payments.length === 0 && (
              <Text
                style={[
                  styles.dmBold,
                  { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)', marginTop: 4 },
                ]}>
                You don't have any listed payment method!{`\n\n`}You can add your payment methods in the profile section
              </Text>
            )}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: IS_ANDROID ? 4 : 16 }}>
              <Text style={[styles.dmFont, { fontSize: moderateScale(14, 2) }]}>Require Proof</Text>
              <Switch
                value={required}
                onValueChange={(val: boolean) => {
                  if (val) setRequired.true();
                  else setRequired.false();
                }}
                thumbColor={colours.white}
                trackColor={{
                  true: colours.greenNormal,
                  false: colours.redNormal,
                }}
                ios_backgroundColor={colours.redNormal}
              />
            </View> */}
            <CustomButton
              text='Next'
              style={{
                borderRadius: 12,
                paddingVertical: 16,
                width: '50%',
                alignSelf: 'center',
                marginTop: IS_ANDROID ? 8 : 20,
              }}
              onPress={handleNext}
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

export default ActionsPaymentDetails;
