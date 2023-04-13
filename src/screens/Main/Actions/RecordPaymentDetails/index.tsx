import { RouteProp } from '@react-navigation/native';
import ImageView from '@src/components/ImageView';
import CustomButton from '@src/components/input/CustomButton';
import CustomCheckbox from '@src/components/input/CustomCheckbox';
import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { Payment, UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import useBoolean from '@src/utils/useBoolean';
import { getUser, getUserByUsername } from '@src/utils/userCollection';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Switch, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const RecordPaymentDetails = ({ route }: { route: RouteProp<{ params?: { uname?: string } }> }) => {
  const { user } = useSelector((state: RootState) => state);
  const { value: required, setValue: setRequired } = useBoolean(false);

  const [userDetail, setUserDetail] = useState<UserDocument>();

  const getUserDetail = async () => {
    if (route.params?.uname) {
      const user = await getUserByUsername(route.params.uname).then((res) => {
        console.log('line 32', res.data);
        if (res) {
          setUserDetail(res.data as UserDocument);
        }
        return res;
      });
    }
  };

  useEffect(() => {
    if (route.params) {
      getUserDetail();
    }
  }, []);

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
            {userDetail && <UserCard user={userDetail} />}

            <Text style={[styles.dmBold, { fontSize: moderateScale(15, 2), marginTop: 4 }]}>Payment Method</Text>
            <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
              Select one or more
            </Text>
            {userDetail?.payments &&
              userDetail.payments.map((pm: Payment, idx: number) => {
                return <PaymentCard key={idx.toString()} type='BCA' account='999292123 (Raisa Andriana)' />;
              })}
            <PaymentCard type='GoPay' account='081293122134 (Raisa A)' />
            <PaymentCard type='OVO' account='081293122134 (Raisa Andriana)' />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: IS_ANDROID ? 4 : 16 }}>
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

export default RecordPaymentDetails;
