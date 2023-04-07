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
import { useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import IcRecord from '@src/assets/svg/IcRecord';
import IcDivide from '@src/assets/svg/IcDivide';

const Home = () => {
  const { auth } = useSelector((state: RootState) => state);
  // const actionSheetRef = useRef<ActionSheet>();

  // const showActionSheet = () => {
  //   if (actionSheetRef.current) actionSheetRef.current.show();
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingBottom: moderateVerticalScale(160, -1.5) }}>
        <HomeHeader />
        <View style={[globalStyle.paddingHorizontal, { paddingTop: 14 }]}>
          <Text style={styles.name}>Hello Raisa,</Text>
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
          <View style={{ gap: 12, marginTop: 20 }}>
            <Text style={{ fontFamily: 'dm-500', fontSize: moderateScale(16, 2) }}>Recent</Text>
            <TransactionCard type='Incoming' />
            <TransactionCard type='Outcoming' />
            <TransactionCard type='Incoming' />
          </View>
        </View>
      </ScrollView>
      {/* {IS_ANDROID ? (
        <ActionSheetCustom
          // @ts-ignore
          ref={actionSheetRef}
          title={'Which one do you like ?'}
          options={[
            <View
              style={{
                gap: 12,
                width: '100%',
                paddingLeft: 20,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <IcRecord />
              <View>
                <Text style={{ fontFamily: 'inter' }}>Record</Text>
                <Text style={{ fontFamily: 'inter', color: colours.gray300 }}>Log your debt and receivables</Text>
              </View>
            </View>,
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', paddingLeft: 20 }}>
              <IcDivide />
              <View>
                <Text style={{ fontFamily: 'inter' }}>Divide</Text>
                <Text style={{ fontFamily: 'inter', color: colours.gray300 }}>Automatically share expenses</Text>
              </View>
            </View>,
            'Cancel',
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          theme='ios'
          onPress={() => null}
        />
      ) : (
        <ActionSheet
          // @ts-ignore
          ref={actionSheetRef}
          title={'Which one do you like ?'}
          options={['Record', 'Divide', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          theme='ios'
          onPress={() => null}
        />
      )} */}
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
