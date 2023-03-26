import ImageView from '@src/components/ImageView';
import CustomButton from '@src/components/Input/CustomButton';
import CustomCheckbox from '@src/components/Input/CustomCheckbox';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import useBoolean from '@src/utils/useBoolean';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Switch, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const PaymentCard = ({
  type = 'BCA',
  account = '999292123 (Raisa Andriana)',
}: {
  type?: 'BCA' | 'GoPay' | 'OVO';
  account?: string;
}) => {
  const { value: check, setValue: setCheck } = useBoolean(false);

  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.05)'}
      onPress={() => setCheck.toggle()}
      style={{ borderColor: 'rgba(41, 176, 41, 0.2)', borderWidth: 1, borderRadius: 12, marginVertical: 6 }}>
      <View
        style={{
          padding: 14,
          flexDirection: 'row',
        }}>
        <ImageView name={type?.toLowerCase()} style={{ width: moderateScale(49, 2), height: moderateScale(35, 2) }} />
        <View style={{ marginLeft: 12, justifyContent: 'center' }}>
          <Text style={[styles.dmFont, { fontSize: moderateScale(13, 2) }]}>{type}</Text>
          <Text style={[styles.dmFont, { fontSize: moderateScale(11, 2), color: colours.gray300 }]}>{account}</Text>
        </View>
        <View
          style={{
            width: 40,
            marginLeft: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomCheckbox value={check} setValue={setCheck} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const PaymentDetails = () => {
  const { value: required, setValue: setRequired } = useBoolean(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Payment Details
          </Text>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ paddingBottom: moderateVerticalScale(160, -1.5) }}
            showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>
              Pay To
            </Text>
            <UserCard />

            <Text style={[styles.dmBold, { fontSize: moderateScale(15, 2), marginTop: 4 }]}>Payment Method</Text>
            <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
              Select one or more
            </Text>
            <PaymentCard type='BCA' account='999292123 (Raisa Andriana)' />
            <PaymentCard type='GoPay' account='081293122134 (Raisa A)' />
            <PaymentCard type='OVO' account='081293122134 (Raisa Andriana)' />
            <PaymentCard type='OVO' account='081293122134 (Raisa Andriana)' />
            <PaymentCard type='OVO' account='081293122134 (Raisa Andriana)' />
            <PaymentCard type='OVO' account='081293122134 (Raisa Andriana)' />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: IS_ANDROID ? 4 : 16 }}>
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
            />
          </ScrollView>
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-500',
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

export default PaymentDetails;
