import { TextInput, View } from 'react-native';
import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import colours from '@src/utils/colours';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useState } from 'react';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';

const PaymentCard = () => {
  const [amount, setAmount] = useState<string>();

  const convertAmount = (rp: string) => {
    if (rp.length === 0) return setAmount('');

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    const cleared = rp.replace(/\./g, '');

    const num = formatter
      .format(parseInt(cleared))
      .replace(/,\d{2}$/, '')
      .split('Rp')[1]
      .trim();

    if (num) setAmount(num);
  };

  return (
    <View
      style={{
        padding: 20,
        width: '96%',
        marginTop: 2,
        elevation: 6,
        borderRadius: 20,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        marginBottom: 12,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.white,
      }}>
      <ImageView
        name='tree-1'
        style={{
          width: moderateScale(52, 2),
          height: moderateScale(52, 2),
          alignSelf: 'center',
        }}
      />
      <Text style={[styles.dmFont]}>Jisoo</Text>
      <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>sooyaaa_</Text>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          marginVertical: 16,
        }}>
        <Text style={{ fontFamily: 'inter-500', fontSize: moderateScale(36, 2) }}>Rp</Text>

        <TextInput
          onChangeText={(e) => {
            convertAmount(e);
          }}
          value={amount}
          maxLength={9}
          placeholder='0'
          keyboardType='number-pad'
          textBreakStrategy='simple'
          style={{
            width: '100%',
            marginLeft: 12,
            fontFamily: 'dm',
            fontSize: moderateScale(34, 2),
          }}
          placeholderTextColor={colours.gray300}
        />
      </View>
      <TextInput
        style={{
          fontFamily: 'inter',
          fontSize: moderateScale(10, 2),
          color: colours.gray500,
          textAlign: 'center',
          width: '100%',
        }}
        placeholderTextColor={colours.gray300}
        placeholder={'add note (optional)'}
        maxLength={32}
      />
    </View>
  );
};

const PaymentPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Enter Payment Amount
          </Text>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: moderateVerticalScale(140, -1.5),
              // gap: 20
            }}
            showsVerticalScrollIndicator={true}>
            {Array(4)
              .fill(0)
              .map((_, idx) => {
                return <PaymentCard key={idx} />;
              })}
            <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'space-between' }}>
              <CustomButton
                style={[styles.button, { backgroundColor: colours.grayNormal }]}
                text='Add another friend'
                textStyle={styles.buttonText}
              />
              <CustomButton
                style={[styles.button]}
                text='Next'
                textStyle={styles.buttonText}
                onPress={() => navigate('PaymentDetails')}
              />
            </View>
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

export default PaymentPage;
