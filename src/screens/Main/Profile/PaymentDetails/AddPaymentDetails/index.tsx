import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import colours from '@src/utils/colours';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import TextFieldAlt from '@src/components/input/TextFieldAlt';
import CustomDropdown from '@src/components/input/CustomDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { Payment } from '@src/types/collection/usersCollection';
import { addPayment } from '@src/utils/collections/userCollection';
import { store } from '@src/redux/store';
import { setPayments } from '@src/redux/actions/user';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { label: 'BCA', value: 'BCA' },
  { label: 'BNI', value: 'BNI' },
  { label: 'MANDIRI', value: 'MANDIRI' },
  { label: 'GOPAY', value: 'GOPAY' },
  { label: 'SHOPEEPAY', value: 'SHOPEEPAY' },
  { label: 'DANA', value: 'DANA' },
  { label: 'JAGO', value: 'JAGO' },
  { label: 'JENIUS', value: 'JENIUS' },
  { label: 'OVO', value: 'OVO' },
  { label: 'Other...', value: 'OTHER' },
];

const AddPaymentDetails = () => {
  const { user } = useSelector((state: RootState) => state);

  const { canGoBack, goBack } = useNavigation();

  const [accNumber, setAccNumber] = useState<string>('');
  const [accName, setAccName] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payment = {
        bankName: value !== 'OTHER' ? value : bankName,
        name: accName,
        number: accNumber,
      } as Payment;
      let newPayments: Payment[] = [payment];
      let isExists: boolean = false;

      if (user.payments !== null && user.payments !== undefined) {
        user.payments.map((p, idx) => {
          if (p.bankName === payment.bankName && p.name === payment.name && p.number === payment.number)
            isExists = true;
        });
        newPayments = [payment, ...user.payments];
      }

      if (!isExists) {
        store.dispatch(setPayments({ payments: newPayments }));
        addPayment(newPayments, user.uid!!);
        if (canGoBack()) goBack();
      }
    } catch {
      __DEV__ && console.log('line 70');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, marginBottom: 20 },
            ]}>
            Add Payment Details
          </Text>
          <Text style={styles.labelTitle}>Select Bank/e-Wallet</Text>
          <CustomDropdown data={DATA} value={value} setValue={setValue} style={{ marginBottom: 20 }} />
          {value === 'OTHER' && (
            <TextFieldAlt
              inputStyle={styles.inputStyle}
              style={{ marginBottom: 20 }}
              title='Bank/e-Wallet Name'
              setValue={setBankName}
              placeholderText='Bank or e-Wallet Name'
            />
          )}
          <TextFieldAlt
            inputStyle={styles.inputStyle}
            style={{ marginBottom: 20 }}
            title='Account Number or Mobile Phone'
            keyboardType='number-pad'
            setValue={setAccNumber}
            placeholderText='Account Number or Mobile Phone'
          />
          <TextFieldAlt
            inputStyle={styles.inputStyle}
            title='Account Name'
            setValue={setAccName}
            placeholderText='Account Name'
          />
          <CustomButton style={[styles.button]} text='Save' textStyle={styles.buttonText} onPress={handleSave} />
          {isLoading && (
            <View style={{ marginTop: 40 }}>
              <ActivityIndicator animating={isLoading} />
            </View>
          )}
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelTitle: {
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 4,
    color: colours.black,
    fontFamily: 'dm-700',
  },
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
  button: {
    width: 160,
    marginTop: 40,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
  inputStyle: {
    paddingVertical: 4,
  },
});
export default AddPaymentDetails;
