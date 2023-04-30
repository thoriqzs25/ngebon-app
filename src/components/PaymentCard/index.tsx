import useBoolean from '@src/utils/hooks/useBoolean';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImageView from '../ImageView';
import { moderateScale } from 'react-native-size-matters';
import colours from '@src/utils/colours';
import CustomCheckbox from '../input/CustomCheckbox';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const knownBank = ['BCA', 'BNI', 'DANA', 'GOPAY', 'SHOPEEPAY', 'JAGO', 'JENIUS', 'OVO', 'MANDIRI'];

const PaymentCard = ({
  type,
  name,
  number,
  withCheckbox = false,
  isChecked,
  onCheckChanged,
  onPress,
  rightArrow = false,
}: {
  type: string;
  name: string;
  number: string;
  withCheckbox?: boolean;
  isChecked?: boolean;
  onCheckChanged?: (checked: boolean) => void;
  onPress?: () => void;
  rightArrow?: boolean;
}) => {
  const { value: check, setValue: setCheck } = useBoolean(false);
  const [img, setImg] = useState<string>();

  useEffect(() => {
    if (knownBank.includes(type)) setImg(type);
    else setImg('OTHER');
  }, [type]);

  const handleCheckChanged = (checked: boolean) => {
    onCheckChanged && onCheckChanged(checked);
  };
  const handlePress = () => {
    onPress && onPress();
    onCheckChanged && onCheckChanged(!isChecked);
  };

  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.05)'}
      onPress={handlePress}
      style={{ borderColor: 'rgba(41, 176, 41, 0.2)', borderWidth: 1, borderRadius: 12, marginVertical: 6 }}>
      <View
        style={{
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ImageView name={img?.toLowerCase()} style={{ width: moderateScale(49, 2), height: moderateScale(35, 2) }} />
        <View style={{ marginLeft: 12, justifyContent: 'center' }}>
          <Text style={[styles.dmFont, { fontSize: moderateScale(13, 2) }]}>{type}</Text>
          <Text style={[styles.dmFont, { fontSize: moderateScale(11, 2), color: colours.gray300 }]}>{number}</Text>
          <Text
            style={[styles.dmFont, { fontSize: moderateScale(11, 2), color: colours.gray300 }]}
            numberOfLines={1}>{`(${name})`}</Text>
        </View>
        {withCheckbox && (
          <View
            style={{
              width: 40,
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomCheckbox value={isChecked} onCheckChanged={handleCheckChanged} />
          </View>
        )}
        {rightArrow && (
          <View
            style={{
              width: 40,
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name={'chevron-forward-outline'} color={'rgba(0,0,0,0.25)'} size={24} />
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
  button: {
    width: 160,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
});

export default PaymentCard;
