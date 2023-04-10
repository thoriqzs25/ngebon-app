import colours from '@utils/colours';
import { StyleProp, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import useBoolean from '@src/utils/useBoolean';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UseBoolean } from '@src/types/UseBoolean';

const CustomCheckbox = ({
  style,
  boxStyle,
  title,
  value,
  setValue,
  error = false,
  onCheckChanged,
}: {
  style?: StyleProp<any>;
  boxStyle?: StyleProp<any>;
  title?: string;
  value?: boolean;
  setValue?: UseBoolean;
  error?: boolean;
  onCheckChanged?: (checked: boolean) => void;
}) => {
  const { value: active, setValue: setActive } = useBoolean(false);

  useEffect(() => {
    if (value) setActive.true();
    else setActive.false();
    onCheckChanged && onCheckChanged(!!value);
  }, [value]);

  useEffect(() => {
    if (active) setValue && setValue.true();
    else setValue && setValue.false();
  }, [active]);
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        setActive.toggle();
      }}
      style={[styles.container, style]}>
      <View
        style={[
          styles.boxContainer,
          boxStyle,
          {
            borderColor: active ? colours.greenNormal : error ? colours.redNormal : colours.gray300,
            backgroundColor: active ? colours.greenNormal : colours.white,
          },
        ]}>
        {active && (
          <Ionicons
            name={'checkmark-outline'}
            size={15}
            color={colours.white}
            style={{ backgroundColor: colours.greenNormal }}
          />
        )}
      </View>
      <View>
        <Text style={styles.label}>{title ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  label: { fontFamily: 'dm', color: colours.white, fontSize: 14, lineHeight: 18 },
});

export default CustomCheckbox;
