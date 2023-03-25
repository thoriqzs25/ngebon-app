import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const SCREEN_WIDTH = (() => Dimensions.get('window').width)();
export const SCREEN_HEIGHT = (() => Dimensions.get('window').height)();
// export const SCREEN_HEIGHT = (() =>
//   Platform.OS === 'ios'
//     ? Dimensions.get('window').height
//     : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT'))();

export const STATUS_BAR_HEIGHT = (() => getStatusBarHeight())();
export const DEVICE_HAS_NOTCH = (() => {
  return (Platform.OS === 'ios' && STATUS_BAR_HEIGHT > 20) || (Platform.OS === 'android' && STATUS_BAR_HEIGHT > 24);
})();

export const FULL_TAB_BAR_HEIGHT = DEVICE_HAS_NOTCH ? (Platform.OS === 'ios' ? 90 : 57) : 57;
export const CHIN_HEIGHT = (() => (Platform.OS === 'ios' && DEVICE_HAS_NOTCH ? 34 : 0))();

export const BOTTOM_SCREEN_PADDING = STATUS_BAR_HEIGHT;

export const NAV_BUTTON_HEIGHT = 44;
export const NAV_BUTTON_ALIGN_OFFSET = STATUS_BAR_HEIGHT + NAV_BUTTON_HEIGHT;

export const DEVICE_OS = (() => Platform.OS)();

export const IS_ANDROID = (() => Platform.OS === 'android')();
