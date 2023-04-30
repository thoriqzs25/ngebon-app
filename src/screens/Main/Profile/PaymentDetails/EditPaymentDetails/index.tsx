import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import colours from '@src/utils/colours';
import React, { useCallback, useEffect, useState } from 'react';
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
import { NavigationProp, RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';

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

const EditPaymentDetails = ({ route }: { route: RouteProp<{ params: { payment: Payment } }> }) => {
  const { user } = useSelector((state: RootState) => state);

  const { canGoBack, goBack } = useNavigation();

  const [oldPayment, setOldPayment] = useState<Payment>();
  const [accNumber, setAccNumber] = useState<string>('');
  const [accName, setAccName] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [value, setValue] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async (isDelete?: boolean) => {
    setIsLoading(true);
    try {
      const payment = {
        bankName: value !== 'OTHER' ? value : bankName,
        name: accName,
        number: accNumber,
      } as Payment;
      const userPayments: Payment[] = user.payments as Payment[];

      const filteredPayments = userPayments.filter(
        (p) => p.bankName !== oldPayment?.bankName || p.name !== oldPayment?.name || p.number !== oldPayment?.number
      );

      if (isDelete) {
        addPayment(filteredPayments, user.uid!!);
        store.dispatch(setPayments({ payments: filteredPayments }));
      } else {
        const newPayments = [payment, ...filteredPayments];
        store.dispatch(setPayments({ payments: newPayments }));
        addPayment(newPayments, user.uid!!);
      }
      if (canGoBack()) goBack();
    } catch {
      __DEV__ && console.log('line 69');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params.payment) {
        const { bankName, name, number } = route.params.payment;
        setOldPayment(route.params.payment);
        setAccName(name);
        setAccNumber(number);
        setBankName(bankName);
        setValue(bankName);
      }
    }, [route])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, marginBottom: 20 },
            ]}>
            Edit Payment Details
          </Text>
          <Text style={styles.labelTitle}>Select Bank/e-Wallet</Text>
          <CustomDropdown data={DATA} value={value} setValue={setValue} style={{ marginBottom: 20 }} />
          {value === 'OTHER' && (
            <TextFieldAlt
              inputStyle={styles.inputStyle}
              style={{ marginBottom: 20 }}
              title='Bank/e-Wallet Name'
              value={bankName}
              setValue={setBankName}
              placeholderText='Bank or e-Wallet Name'
            />
          )}
          <TextFieldAlt
            inputStyle={styles.inputStyle}
            style={{ marginBottom: 20 }}
            title='Account Number or Mobile Phone'
            keyboardType='number-pad'
            value={accNumber}
            setValue={setAccNumber}
            placeholderText='Account Number or Mobile Phone'
          />
          <TextFieldAlt
            inputStyle={styles.inputStyle}
            title='Account Name'
            value={accName}
            setValue={setAccName}
            placeholderText='Account Name'
          />
          <CustomButton
            style={[styles.button]}
            text='Save'
            textStyle={styles.buttonText}
            onPress={() => handleSave(false)}
          />
          <CustomButton
            style={[styles.button, { backgroundColor: colours.redNormal, marginTop: 16 }]}
            text='Delete'
            textStyle={styles.buttonText}
            onPress={() => handleSave(true)}
          />
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
export default EditPaymentDetails;
