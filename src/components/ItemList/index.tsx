import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colours from '@src/utils/colours';

export const ItemList = ({
  idx,
  name,
  price,
  qty,
  totalPrice,
}: // onEdit,
// onDelete,
{
  idx: number;
  name: string;
  price: string;
  qty: string;
  totalPrice: number;
  // onEdit: () => void;
  // onDelete: () => void;
}) => {
  const [priceItem, setPrice] = useState<string>('');
  const [total, setTotal] = useState<string>('');

  const parseTotalPrice = () => {
    const formattedTotal = 'Rp' + totalPrice.toLocaleString('id-ID');
    const formattedPrice = parseInt(price).toLocaleString('id-ID');
    setPrice(formattedPrice);
    setTotal(formattedTotal);
  };

  useEffect(() => {
    parseTotalPrice();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
      }}>
      <View style={[styles.box]}>
        <Text style={styles.boxTitle}>Item {idx}</Text>
        <View style={{ marginLeft: 4, flex: 1 }}>
          <Text numberOfLines={1} style={{ fontFamily: 'dm-500' }}>
            {name}
          </Text>
          <Text style={{ fontFamily: 'dm', color: 'rgba(0, 0, 0, 0.35)' }}>{priceItem ?? ''}</Text>
        </View>

        <Text style={{ marginRight: 4, flex: 1, textAlign: 'center', fontFamily: 'dm-500' }}>x{qty}</Text>

        <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'dm-500' }}>{total ?? ''}</Text>
      </View>
      {/* <Ionicons name='pencil-outline' size={24} style={{ paddingLeft: 8 }} onPress={onEdit} />
      <Ionicons name='md-trash' size={24} style={{ paddingLeft: 8 }} onPress={onDelete} /> */}
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
