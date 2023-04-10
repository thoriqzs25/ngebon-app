import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colours from '@src/utils/colours';

export const InputItem = ({
  name,
  price,
  qty,
  totalPrice,
  setName,
  setPrice,
  setQty,
  onDelete,
  idx,
}: {
  name: string;
  price: string;
  qty: string;
  totalPrice: number;
  setName: (text: string) => void;
  setPrice: (text: string) => void;
  setQty: (text: string) => void;
  onDelete: () => void;
  idx: number;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
      }}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Item {idx}</Text>
        <TextInput
          style={[styles.input, styles.boxInputText, { flex: 7 }]}
          placeholderTextColor={'rgba(0, 0, 0, 0.25)'}
          value={name}
          placeholder={'Item Name'}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, styles.boxInputPrice, { flex: 4 }]}
          placeholder={'Price'}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Text style={{ marginRight: 4, fontFamily: 'dm-500' }}>X</Text>
        <TextInput
          value={qty}
          style={[styles.input, styles.boxInputPrice, { flex: 2 }]}
          placeholder={'Qty'}
          onChangeText={(text) => setQty(text)}
        />
        <Text style={{ marginRight: 4, fontFamily: 'dm-500' }}>=</Text>
        <View style={[styles.input, styles.boxInputPrice, { flex: 4, marginRight: 0, justifyContent: 'center' }]}>
          <Text style={{ color: colours.gray500 }}>{totalPrice === 0 ? 'Total' : totalPrice}</Text>
        </View>
      </View>

      <Ionicons name='md-trash' size={24} style={{ paddingLeft: 8 }} onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
  box: {
    borderColor: colours.black,
    borderRadius: 8,
    flex: 1,
    height: 44,
    borderWidth: 1,
    position: 'relative',
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxTitle: {
    position: 'absolute',
    top: -10,
    left: 12,
    paddingHorizontal: 4,
    backgroundColor: colours.white,
    color: colours.black,
  },
  boxInputText: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderBottomColor: colours.black,
    borderBottomWidth: 1,
  },
  boxInputPrice: {
    borderRadius: 6,
    borderColor: colours.placeholderBorder,
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 2,
    // paddingVertical: 12,
    height: 24,
    marginRight: 4,
  },
});
