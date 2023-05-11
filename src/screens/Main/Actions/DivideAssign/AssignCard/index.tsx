import CustomIncrementDecrementButtonParts from '@src/components/input/CustomIncrementDecrementButtonParts';
import { UserDocument } from '@src/types/collection/usersCollection';
import colours from '@src/utils/colours';
import { app, storage } from 'firbaseConfig';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';

const AssignCard = ({
  active = false,
  onPress,
  item,
  users,
  idx,
}: {
  active?: boolean;
  onPress?: () => void;
  item: { itemName: string; price: string; qty: string; totalPrice: number };
  users: UserDocument[];
  idx: number;
}) => {
  const [priceItem, setPrice] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [dummyImg, setDummyImg] = useState<string>('');
  const [parts, setParts] = useState<number>(1);

  const parseTotalPrice = () => {
    const formattedTotal = 'Rp' + item.totalPrice.toLocaleString('id-ID');
    const formattedPrice = parseInt(item.price).toLocaleString('id-ID');
    setPrice(formattedPrice);
    setTotal(formattedTotal);
  };

  const getDummyImg = async () => {
    const img = await getDownloadURL(ref(storage, 'images/tree_1.webp'));
    setDummyImg(img);
  };

  useEffect(() => {
    parseTotalPrice();
  }, []);

  useEffect(() => {
    getDummyImg();
  }, []);

  return (
    <View style={{ marginBottom: 2 }}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress && onPress()} style={{ marginTop: 12 }}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Item {idx + 1}</Text>
          <View style={{ marginLeft: 4, flex: 1 }}>
            <Text style={{ fontFamily: 'dm-500' }} numberOfLines={1}>
              {item.itemName}
            </Text>
            <Text style={{ fontFamily: 'dm', color: 'rgba(0, 0, 0, 0.35)' }}>{priceItem ?? ''}</Text>
          </View>
          <Text style={{ marginRight: 4, flex: 1, textAlign: 'center', fontFamily: 'dm-500' }}>x{item.qty}</Text>

          <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'dm-500' }}>{total ?? ''}</Text>
          <View style={{ flex: 1 }}>
            <View
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: active ? colours.greenNormal : '#636366',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: active ? colours.greenNormal : colours.white,
                  borderRadius: 8,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 6 }}>
          <ScrollView
            horizontal={true}
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 4,
              paddingBottom: 4,
              // backgroundColor: colours.blueNormal,
            }}>
            {users &&
              users.map((user, idx) => {
                let img = dummyImg;
                if (user.avatar !== '') {
                  img = user?.avatar ?? dummyImg;
                }

                if (idx <= 0) {
                  return (
                    <View style={{ position: 'relative', alignItems: 'center' }}>
                      <Image
                        key={idx.toString()}
                        source={{
                          uri: img,
                        }}
                        style={[styles.listedUserAvatar]}
                      />
                      <View style={[styles.grayParts]}>
                        <Text style={{ color: colours.white, fontFamily: 'dm', fontSize: 12 }}>2</Text>
                      </View>
                    </View>
                  );
                }
                return (
                  <View style={{ position: 'relative', alignItems: 'center' }}>
                    <Image
                      key={idx.toString()}
                      source={{ uri: img }}
                      style={[styles.listedUserAvatar, { marginLeft: -10 }]}
                    />
                    <View
                      style={[
                        styles.grayParts,
                        {
                          left: 0,
                        },
                      ]}>
                      <Text style={{ color: colours.white, fontFamily: 'dm' }}>2</Text>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
        {active && (
          <View style={{ justifyContent: 'center' }}>
            <CustomIncrementDecrementButtonParts value={parts} setValue={setParts} />
          </View>
        )}
      </View>
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
  userAvatar: {
    width: moderateScale(46, 2),
    height: moderateScale(46, 2),
    borderRadius: 100,
    marginHorizontal: 4,
  },
  listedUserAvatar: {
    width: moderateScale(32, 2),
    height: moderateScale(32, 2),
    borderRadius: 100,
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
  grayParts: {
    bottom: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.gray300,
  },
});

export default AssignCard;
