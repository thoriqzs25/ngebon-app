import colours from '@src/utils/colours';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomIncrementDecrementButton = ({ value, setValue }: { value: number; setValue: (val: number) => void }) => {
  const h = 28,
    w = 116;

  const handleChangeValue = (incOrDec: number) => {
    const _value = value + incOrDec;
    if (_value >= 0) setValue(_value);
  };

  const handleTextChange = (text: string) => {};

  const IncrementDecrementButton = ({ symbol }: { symbol: string }) => {
    return (
      <View
        style={[{ position: 'absolute', zIndex: 10 }, symbol === '-' && { left: 0 }, symbol === '+' && { right: 0 }]}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => handleChangeValue(symbol === '-' ? -1 : 1)}>
          <View
            style={{
              width: h,
              height: h,
              borderWidth: 1,
              borderRadius: 4,
              alignItems: 'center',
              borderColor: '#EDEDED',
              justifyContent: 'center',
              backgroundColor: 'rgba(63, 63, 65, 0.06)',
            }}>
            <Text style={{ fontSize: 24, lineHeight: 28, fontFamily: 'dm-700', color: '#BEBEBE' }}>{symbol}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        position: 'relative',
        width: w,
        height: h,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#EDEDED',
        // backgroundColor: colours.blueNormal,
        justifyContent: 'center',
      }}>
      <IncrementDecrementButton symbol={'-'} />
      <IncrementDecrementButton symbol={'+'} />
      <Text style={{ fontSize: 12, fontFamily: 'dm', textAlign: 'center', textAlignVertical: 'center' }}>
        {value.toString() + '%'}
      </Text>
    </View>
  );
};

export default CustomIncrementDecrementButton;
