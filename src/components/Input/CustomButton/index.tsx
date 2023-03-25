import colours from '@src/utils/colours';
import { Pressable, StyleProp, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomButton = ({
  glow,
  text,
  style,
  onPress,
  iconName,
  iconSize,
  textStyle,
  iconNameRight,
}: {
  text: string;
  glow?: boolean;
  iconName?: string;
  iconSize?: number;
  onPress?: () => void;
  style?: StyleProp<any>;
  iconNameRight?: string;
  textStyle?: StyleProp<any>;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.container,
        style,
        glow && {
          elevation: 2,
          shadowColor: colours.white,
        },
      ]}
      onPress={
        onPress
          ? onPress
          : () => {
              console.log('click line 38', text);
            }
      }>
      {iconName && <Ionicons size={iconSize ? iconSize : 12} name={iconName as any} style={{ marginRight: 4 }} />}
      <Text style={[styles.title, textStyle]}>{text}</Text>

      {iconNameRight && (
        <Ionicons size={12} name={iconNameRight as any} style={{ marginRight: 4, position: 'absolute', right: 8 }} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colours.greenNormal,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: colours.white,
    fontFamily: 'dm',
  },
});

export default CustomButton;
