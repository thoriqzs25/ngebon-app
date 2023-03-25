import ImageView from '@src/components/ImageView';
import { IS_ANDROID, STATUS_BAR_HEIGHT } from '@src/utils/deviceDimensions';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colours from '@src/utils/colours';

const HomeHeader = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingTop: IS_ANDROID ? STATUS_BAR_HEIGHT + 4 : 0,
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
