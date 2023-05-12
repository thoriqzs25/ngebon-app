import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React, { useEffect, useState } from 'react';
import { Easing, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import ImageView from '../ImageView';
import CustomCheckbox from '../input/CustomCheckbox';
import { UserDocument } from '@src/types/collection/usersCollection';
import { UserReducerState } from '@src/types/states/user';
import { ItemDivide, ItemParts } from '@src/types/states/divide';
import TextTicker from 'react-native-text-ticker';

const UserCardMoneyDivide = ({
  onPress,
  user,
  items,
  selectedItem,
}: {
  onPress?: () => void;
  user: UserDocument | UserReducerState;
  items: ItemDivide[];
  selectedItem: ItemParts[];
}) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    selectedItem.map((item) => {
      total += (item.parts / items[item.itemIdx].fullParts) * items[item.itemIdx].totalPrice;
      // total += items[num].pricePerUser!!;
    });

    setTotalAmount(total);
  }, [selectedItem]);
  return (
    <View style={{ padding: 4, borderRadius: 12, marginBottom: 8 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <ImageView
          name='tree-1'
          remoteAssetFullUri={user !== undefined ? user.avatar : ''}
          style={{
            width: moderateScale(46, 2),
            height: moderateScale(46, 2),
            borderRadius: 100,
            // alignSelf: 'center',
          }}
        />
        <View style={{ flex: 1, marginLeft: 24 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <TextTicker
                style={{ fontFamily: 'dm-500', fontSize: moderateScale(12, 2) }}
                duration={5000}
                bounce={false}
                easing={Easing.inOut(Easing.linear)}
                // @ts-ignore
                scroll={'toLeft'}
                repeatSpacer={30}>
                {user ? `${user.name}` : 'Loading'}
              </TextTicker>
              <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
                {user ? user.username : ''}
              </Text>
            </View>
            <View style={{ flexShrink: 1, marginLeft: 'auto' }}>
              <Text style={[styles.name, { textAlign: 'right', fontSize: 16 }]} numberOfLines={1}>
                Rp{totalAmount.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
          <Text style={[styles.dmFont, styles.items, { marginTop: 8 }]}>Items:</Text>
          {selectedItem.map((item, idx) => {
            const { itemName, qty, totalPrice } = items[item.itemIdx];

            return (
              <View key={idx.toString()} style={{ flexDirection: 'row', width: '85%' }}>
                <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 5 }]}>
                  {itemName ?? ''}
                </Text>
                <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]}>{`${item.parts}/${
                  items[item.itemIdx].fullParts
                }`}</Text>
                {/* <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]}>{qty ?? ''}</Text> */}
                <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 3 }]}>
                  {totalPrice ? `Rp${totalPrice.toLocaleString('id-ID')}` : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
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
  items: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: moderateScale(10, 2),
  },
});

export default UserCardMoneyDivide;
