import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const CustomIncrementDecrementButton = ({
  value,
  setValue,
  h = 28,
  w = 116,
}: {
  value: number;
  setValue: (val: number) => void;
  h?: number;
  w?: number;
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    inputRef.current?.setNativeProps({ text: value.toString() });
  };

  const handleChangeValue = (incOrDec: number) => {
    const _value = value + incOrDec;
    if (_value >= 0 && _value <= 100) setValue(_value);
  };

  const handleTextChange = (text: string) => {
    const _value = parseInt(text.split('%')[0]);
    if (text === '') setValue(0);
    else if (_value < 0) {
      setValue(0);
    } else if (_value > 100) {
      setValue(100);
    } else {
      setValue(_value);
    }
  };

  const IncrementDecrementButton = ({ symbol }: { symbol: string }) => {
    return (
      <View
        style={[{ position: 'absolute', zIndex: 10 }, symbol === '-' && { left: 0 }, symbol === '+' && { right: 0 }]}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => handleChangeValue(symbol === '-' ? -0.5 : 0.5)}>
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
        justifyContent: 'center',
      }}>
      <IncrementDecrementButton symbol={'-'} />
      <IncrementDecrementButton symbol={'+'} />
      <Pressable
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          height: h,
          width: w - 2 * h,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleFocus}>
        <TextInput
          ref={inputRef}
          keyboardType='number-pad'
          value={value.toString()}
          onBlur={handleBlur}
          clearTextOnFocus={true}
          onChangeText={(text: string) => handleTextChange(text)}
          style={{
            fontSize: 12,
            fontFamily: 'dm',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        />
        <Text style={{ fontSize: 12, fontFamily: 'dm', textAlign: 'center', textAlignVertical: 'center' }}>%</Text>
      </Pressable>
    </View>
  );
};

export default CustomIncrementDecrementButton;
