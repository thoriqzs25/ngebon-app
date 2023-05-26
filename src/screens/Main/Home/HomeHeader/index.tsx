import ImageView from '@src/components/ImageView';
import { IS_ANDROID, STATUS_BAR_HEIGHT } from '@src/utils/deviceDimensions';
import { Text, View } from 'react-native';
import colours from '@src/utils/colours';
import { moderateScale } from 'react-native-size-matters';
import Constants from 'expo-constants';

const HomeHeader = () => {
  return (
    <View
      style={{
        paddingBottom: 14,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: colours.white,
        justifyContent: 'space-between',
        paddingTop: IS_ANDROID ? STATUS_BAR_HEIGHT + 4 : 0,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      }}>
      <ImageView name='logo' style={{ width: IS_ANDROID ? 36 : 32, height: 32 }} />
      <Text
        style={[
          {
            fontFamily: 'dm-700',
            fontSize: moderateScale(12, 2),
            color: 'rgba(0,0,0,0.5)',
            // backgroundColor: colours.gray,
            marginTop: 'auto',
          },
        ]}>
        {Constants?.manifest?.version}
      </Text>
      {/* <View style={{ flexDirection: 'row', gap: IS_ANDROID ? 24 : 12 }}>
        <Ionicons name='settings-outline' color={colours.greenNormal} size={IS_ANDROID ? 28 : 24} />
        <Ionicons name='notifications-circle-outline' color={colours.greenNormal} size={IS_ANDROID ? 30 : 26} />
      </View> */}
    </View>
  );
};

export default HomeHeader;
