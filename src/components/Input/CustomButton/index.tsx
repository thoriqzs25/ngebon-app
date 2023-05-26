import colours from '@src/utils/colours';
import { StyleProp, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomButton = ({
  glow,
  text,
  style,
  disabled = false,
  onPress,
  iconName,
  iconSize,
  textStyle,
  iconNameRight,
  iconColor,
}: {
  text: string;
  glow?: boolean;
  iconName?: string;
  iconSize?: number;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<any>;
  iconNameRight?: string;
  textStyle?: StyleProp<any>;
  iconColor?: string;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        styles.container,
        style,
        glow && {
          elevation: 2,
          shadowColor: colours.white,
        },
        disabled && {
          backgroundColor: colours.gray300,
        },
      ]}
      onPress={
        onPress
          ? onPress
          : () => {
              console.log('click line 38', text);
            }
      }>
      {iconName && (
        <Ionicons
          size={iconSize ? iconSize : 12}
          name={iconName as any}
          color={iconColor ? iconColor : 'black'}
          style={{ marginRight: 4 }}
        />
      )}
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
