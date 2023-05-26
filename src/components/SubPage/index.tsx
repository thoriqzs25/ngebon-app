import { useNavigation } from '@react-navigation/native';
import colours from '@utils/colours';
import { globalStyle } from '@utils/globalStyles';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IS_ANDROID } from '@src/utils/deviceDimensions';

const SubPage = ({
  children,
  title,
  childPadding = true,
  subTitle,
  subTitleIcon,
  style,
  customGoBack,
}: {
  children: JSX.Element;
  title?: string;
  childPadding?: boolean;
  subTitle?: string;
  subTitleIcon?: string;
  style?: StyleProp<any>;
  customGoBack?: () => void;
}) => {
  const { navigate, goBack, canGoBack } = useNavigation();

  const handleBack = () => {
    if (customGoBack !== undefined) customGoBack();
    else if (canGoBack()) goBack();
  };
  return (
    <View
      style={[
        styles.layoutContainer,
        childPadding && globalStyle.paddingHorizontal,
        IS_ANDROID && globalStyle.paddingTop,
        style,
      ]}>
      <View style={[styles.headerContainer, !childPadding && globalStyle.paddingHorizontal]}>
        <TouchableOpacity activeOpacity={0.75} style={styles.leftContainer} onPress={handleBack}>
          <Ionicons name='arrow-back' size={32} color={colours.greenNormal} style={styles.icon} />
          {subTitle ? (
            <View style={styles.textContainer}>
              {title && <Text style={styles.title}>{title}</Text>}
              <View style={styles.subTitleContainer}>
                {subTitleIcon && <Ionicons name='receipt' size={12} style={styles.subTitleIcon} />}
                <Text style={styles.subTitle}>{subTitle}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.title}>{title ?? ''}</Text>
          )}
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  layoutContainer: { flex: 1, zIndex: 100 },
  headerContainer: { alignSelf: 'flex-start' },
  leftContainer: {
    paddingRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  textContainer: {},
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colours.greenNormal,
    fontFamily: 'dm-500',
  },
  subTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: 10,
    lineHeight: 14,
    color: colours.white,
    fontFamily: 'dm',
  },
  subTitleIcon: {
    marginRight: 4,
  },
});

export default SubPage;
