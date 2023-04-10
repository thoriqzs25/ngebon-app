import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import ImageView from '../ImageView';
import CustomCheckbox from '../input/CustomCheckbox';

const UserCard = ({
  onPress,
  withCheckBox,
  onCheckChanged,
}: {
  onPress?: () => void;
  withCheckBox?: boolean;
  onCheckChanged?: (checked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckChanged = (checked: boolean) => {
    setIsChecked(checked);
    onCheckChanged && onCheckChanged(checked);
  };

  const handlePress = () => {
    if (withCheckBox) {
      setIsChecked(!isChecked);
      onCheckChanged && onCheckChanged(!isChecked);
    }
    onPress && onPress();
  };

  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.1)'}
      onPress={handlePress}
      style={{ padding: 4, borderRadius: 12, marginBottom: 8 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <ImageView
          name='tree-1'
          style={{
            width: moderateScale(46, 2),
            height: moderateScale(46, 2),
            alignSelf: 'center',
          }}
        />
        <View style={{ flexShrink: 1, marginLeft: 24 }}>
          <Text style={[styles.name]} numberOfLines={1}>
            Raisa Andriana aksjdhaskjhdklajssdasdasdasdas hdlkjas hdkjl
          </Text>
          <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>raisa6690</Text>
        </View>
        {withCheckBox && (
          <View style={{ marginLeft: 'auto', paddingLeft: 16, paddingRight: 4 }}>
            <CustomCheckbox value={isChecked} onCheckChanged={handleCheckChanged} />
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
  name: {
    fontFamily: 'dm-500',
  },
  dmFont: {
    fontFamily: 'dm',
  },
});

export default UserCard;
