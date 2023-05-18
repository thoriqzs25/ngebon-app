import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { Payment } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const PaymentDetails = () => {
  const { payments } = useSelector((state: RootState) => state.user);

  const handlePress = (p: Payment) => {
    navigate('EditPaymentDetails', { payment: p });
  };

  useEffect(() => {
    if (payments?.length === 0) navigate('AddPaymentDetails');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, marginBottom: 20 },
            ]}>
            Payment Details
          </Text>
          {payments?.length === 0 && (
            <View>
              <Text style={styles.prompt}>Add your payment details</Text>
            </View>
          )}
          <ScrollView style={{ flex: 1 }}>
            {payments &&
              payments.map((payment: Payment, idx: number) => {
                return (
                  <PaymentCard
                    key={idx.toString()}
                    type={payment.bankName}
                    name={payment.name}
                    number={payment.number}
                    onPress={() => handlePress(payment)}
                    rightArrow={true}
                  />
                );
              })}
          </ScrollView>
          <CustomButton
            style={[styles.button]}
            text='+ Add More'
            textStyle={styles.buttonText}
            onPress={() => navigate('AddPaymentDetails')}
          />
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
    marginTop: 12,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
  prompt: {
    fontFamily: 'dm-700',
    color: colours.gray300,
  },
});
export default PaymentDetails;
