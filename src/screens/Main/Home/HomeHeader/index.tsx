import ImageView from '@src/components/ImageView';
import { IS_ANDROID, STATUS_BAR_HEIGHT } from '@src/utils/deviceDimensions';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colours from '@src/utils/colours';

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
      <View style={{ flexDirection: 'row', gap: IS_ANDROID ? 24 : 12 }}>
        <Ionicons name='settings-outline' color={colours.greenNormal} size={IS_ANDROID ? 28 : 24} />
        <Ionicons name='notifications-circle-outline' color={colours.greenNormal} size={IS_ANDROID ? 30 : 26} />
      </View>
    </View>
  );
};

export default HomeHeader;
