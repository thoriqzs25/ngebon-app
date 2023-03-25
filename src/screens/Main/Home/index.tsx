import ImageView from '@src/components/ImageView';
import colours from '@src/utils/colours';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IS_ANDROID, STATUS_BAR_HEIGHT } from '@src/utils/deviceDimensions';
import HomeHeader from './HomeHeader';
import { StyleSheet } from 'react-native';
import { globalStyle } from '@src/utils/globalStyles';
import { moderateScale } from 'react-native-size-matters';
import Svg, { G, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const Home = () => {
  const SvgHomeCard = () => {
    return (
      <View style={{ alignItems: 'center', position: 'relative', backgroundColor: colours.fieldStroke }}>
        <Svg width={350} height={154} viewBox='0 0 339 154' fill='none'>
          <G filter='url(#filter0_dii_1_637)'>
            <Path
              d='M7 68.509c0-26.67 0-40.006 6.105-49.749A39.998 39.998 0 0125.76 6.105C35.503 0 48.838 0 75.51 0h188.05c26.606 0 39.909 0 49.635 6.077a39.993 39.993 0 0112.729 12.729C332 28.532 332 41.835 332 68.44c0 24.378 0 36.568-5.525 45.957-2.885 4.905-6.995 9.334-11.67 12.578-8.951 6.212-20.811 7.101-44.533 8.879-74.106 5.556-130.946 5.465-201.63.098-23.703-1.8-35.554-2.7-44.51-8.94-4.633-3.228-8.72-7.637-11.588-12.502C7 105.109 7 92.909 7 68.509z'
              fill='url(#paint0_linear_1_637)'
            />
          </G>
          <Defs>
            <LinearGradient
              id='paint0_linear_1_637'
              x1={332}
              y1={140}
              x2={230.263}
              y2={-96.1749}
              gradientUnits='userSpaceOnUse'>
              <Stop stopColor='#29B029' stopOpacity={0.4} />
              <Stop offset={1} stopColor='#29B029' />
            </LinearGradient>
          </Defs>
        </Svg>
        <View
          style={{
            height: '80%',
            position: 'absolute',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 8,
            justifyContent: 'space-evenly',
          }}>
          <View style={[styles.text_container]}>
            <Text style={[styles.white_text, styles.text_1]}>Debt</Text>
            <Text style={[styles.white_text, styles.text_2]}>Amount you owe</Text>
            <Text style={[styles.white_text, styles.text_3]}>Rp300.000</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={[styles.white_text, styles.view_all_box, styles.text_4]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.text_container}>
            <Text style={[styles.white_text]}>Debt</Text>
            <Text style={[styles.white_text, styles.text_2]}>Amount you owe</Text>
            <Text style={[styles.white_text, styles.text_3]}>Rp300.000</Text>
            <View>
              <Text style={[styles.white_text, styles.view_all_box, styles.text_4]}>View All</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      <View style={globalStyle.padding}>
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
        <TouchableOpacity activeOpacity={0.75}>
          <Text style={[styles.white_text, styles.view_all_box, styles.text_4]}>View All</Text>
        </TouchableOpacity>
        <SvgHomeCard />

        <View>
          <Text>test</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: moderateScale(22, 2),
    fontFamily: 'dm-500',
    color: colours.greenNormal,
  },
  text_container: {
    alignItems: 'center',
  },
  white_text: {
    color: colours.white,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colours.white,
  },
  view_all_box: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: colours.redNormal,

    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  text_1: { fontFamily: 'pop' },
  text_2: { fontFamily: 'pop', fontSize: moderateScale(8, 2) },
  text_3: { fontFamily: 'inter-700' },
  text_4: { fontFamily: 'roboto-500' },
});

export default Home;
