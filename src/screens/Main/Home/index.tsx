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

const Home = () => {
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

          <View style={{ gap: 12, marginTop: 20 }}>
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
