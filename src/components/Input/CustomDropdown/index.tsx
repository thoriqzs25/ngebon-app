import ImageView from '@src/components/ImageView';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
  { label: 'BCA', value: 'BCA' },
  { label: 'BNI', value: 'BNI' },
  { label: 'MANDIRI', value: 'MANDIRI' },
  { label: 'GOPAY', value: 'GOPAY' },
  { label: 'OVO', value: 'OVO' },
  { label: 'Other...', value: 'OTHER' },
];

const Item = (props: any) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => props.onPress(props)}>
      <View style={styles.item}>
        <ImageView
          name={props.item.value.toLowerCase() ?? 'bca'}
          style={{ width: moderateScale(49, 2), height: moderateScale(35, 2), marginRight: 8 }}
        />
        {/* {image && <ImageView name={image} style={{ width: 18, height: 18, marginRight: 8 }} />} */}
        <Text style={[styles.textItem, styles.defaultText]}>{props.item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CustomDropdown = ({
  data,
  style,
  image,
  value,
  placeholder,
  setValue,

  disable = false,
}: {
  data?: { label: string; value: string }[];
  style?: StyleProp<any>;
  image?: string;
  value?: any;
  placeholder?: string;
  disable?: boolean;
  setValue?: any;
}) => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={data ?? DATA}
      // mode={'BADGE'}
      setOpen={setOpen}
      setValue={setValue}
      // addCustomItem={true}
      // renderBadgeItem={(props) => <Item {...props} />}
      renderListItem={(props) => <Item {...props} />}
      containerStyle={[style]}
      dropDownContainerStyle={{
        marginTop: 20,
        borderColor: colours.greenNormal,
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 4,
      }}
      selectedItemContainerStyle={{
        backgroundColor: 'grey',
      }}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  item: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  defaultText: {
    fontSize: 16,
    marginLeft: 8,
    color: colours.black,
    fontFamily: 'dm-500',
  },
  textItem: {
    flex: 1,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
