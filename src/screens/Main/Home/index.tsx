import ImageView from '@src/components/ImageView';
import colours from '@src/utils/colours';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from './HomeHeader';
import { StyleSheet } from 'react-native';
import { globalStyle } from '@src/utils/globalStyles';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import GreenSection from './GreenSection';
import TransactionCard from '@src/components/TransactionCard';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '@src/components/input/CustomButton';
import ActionSheet, { ActionSheetCustom } from '@alessiocancian/react-native-actionsheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import IcRecord from '@src/assets/svg/IcRecord';
import IcDivide from '@src/assets/svg/IcDivide';
import { getUser } from '@src/utils/userCollection';
import { store } from '@src/redux/store';
import { setUser } from '@src/redux/actions/user';

const Home = () => {
  const { auth, user } = useSelector((state: RootState) => state);
  // const actionSheetRef = useRef<ActionSheet>();

  // const showActionSheet = () => {
  //   if (actionSheetRef.current) actionSheetRef.current.show();
  // };
  useEffect(() => {
    if (user?.name === undefined) {
      getUser(auth.uid as string);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingBottom: moderateVerticalScale(160, -1.5) }}>
        <HomeHeader />
        <View style={[globalStyle.paddingHorizontal, { paddingTop: 14 }]}>
          <Text style={styles.name}>
            {user?.name !== undefined ? `Hello ${user.name?.split(' ')[0]},` : 'Loading..'}
          </Text>
          <Text style={{ fontFamily: 'dm', fontSize: moderateScale(14, 2) }}>
            Let's log and monitor your transactions!
          </Text>

          <ImageView
            name='tree-1'
            style={{
              width: moderateScale(120, 2),
              height: moderateScale(120, 2),
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />

          <GreenSection />
          {/* <CustomButton text='Click me!' onPress={showActionSheet} /> */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'dm-500', fontSize: moderateScale(16, 2) }}>Recent</Text>
            <TransactionCard type='Incoming' />
            <TransactionCard type='Outcoming' />
            <TransactionCard type='Incoming' />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: moderateScale(22, 2),
    fontFamily: 'dm-500',
    color: colours.greenNormal,
  },
});

export default Home;
