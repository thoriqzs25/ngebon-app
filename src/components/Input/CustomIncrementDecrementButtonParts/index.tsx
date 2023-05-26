import React, { useRef } from 'react';
import { Pressable, Text, View, TextInput, TouchableOpacity } from 'react-native';

const CustomIncrementDecrementButtonParts = ({
  value,
  increment,
  decrement,
  h = 28,
  w = 80,
}: {
  value: number;
  increment: () => void;
  decrement: () => void;
  h?: number;
  w?: number;
}) => {
  const inputRef = useRef<TextInput>(null);

  const IncrementDecrementButton = ({ symbol }: { symbol: string }) => {
    return (
      <View
        style={[{ position: 'absolute', zIndex: 10 }, symbol === '-' && { left: 0 }, symbol === '+' && { right: 0 }]}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            if (symbol === '-') {
              decrement();
            } else {
              increment();
            }
          }}>
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
        }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'dm',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {value}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomIncrementDecrementButtonParts;
