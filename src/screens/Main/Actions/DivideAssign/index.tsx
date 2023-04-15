import { RouteProp } from '@react-navigation/native';
import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { setAssignedFriends, setDivideItems } from '@src/redux/actions/divide';
import { store } from '@src/redux/store';
import { UserDocument } from '@src/types/collection/usersCollection';
import { AssignFriend, AssignItems, ItemDivide } from '@src/types/states/divide';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { app, storage } from 'firbaseConfig';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

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

  const parseTotalPrice = () => {
    const formattedTotal = 'Rp' + item.totalPrice.toLocaleString('id-ID');
    const formattedPrice = parseInt(item.price).toLocaleString('id-ID');
    setPrice(formattedPrice);
    setTotal(formattedTotal);
  };

  const getDummyImg = async () => {
    const img = await getDownloadURL(ref(getStorage(app), 'images/tree_1.webp'));
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
      <View style={{ flexDirection: 'row', marginTop: 4 }}>
        {users &&
          users.map((user, idx) => {
            let img = dummyImg;
            if (user.avatar !== '') {
              img = user?.avatar ?? dummyImg;
            }

            if (idx <= 0) {
              return (
                <Image
                  key={idx.toString()}
                  source={{
                    uri: img,
                  }}
                  style={[styles.listedUserAvatar]}
                />
              );
            }
            return (
              <Image
                key={idx.toString()}
                source={{ uri: img }}
                style={[styles.listedUserAvatar, { marginLeft: -10 }]}
              />
            );
          })}
      </View>
    </View>
  );
};

const DivideAssign = ({ route }: { route: RouteProp<{ params: { selectedFriends: UserDocument[] } }> }) => {
  const { divide } = useSelector((state: RootState) => state);

  const [currIdx, setCurrIdx] = useState<number>(0);
  const [friends, setFriends] = useState<AssignFriend[]>([]);
  const [items, setItems] = useState<AssignItems[]>([]);
  // const [active, setActive] = useState<boolean>(false);

  const handleSelectItem = async (item: AssignItems, idx: number) => {
    const prevItems = [...items];
    const prevFriends = [...friends];

    if (prevItems[idx].userArr.find((item) => item.username === friends[currIdx].user.username) === undefined) {
      prevItems[idx].userArr.push(friends[currIdx].user);

      // prevItems[idx].userArr.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));
      setItems(prevItems);
    } else {
      const userArr = prevItems[idx].userArr.filter((user) => user.username !== friends[currIdx].user.username);
      prevItems[idx].userArr = userArr;
      setItems(prevItems);
    }

    if (prevFriends[currIdx].selectedItem.find((num) => num === idx) === undefined) {
      prevFriends[currIdx].selectedItem.push(idx);

      // prevFriends[currIdx].selectedItem.sort((a, b) => a - b);
      setFriends(prevFriends);
    } else {
      const selectedItemArr = prevFriends[currIdx].selectedItem.filter((num) => num !== idx);
      prevFriends[currIdx].selectedItem = selectedItemArr;
      setFriends(prevFriends);
    }
  };

  const handleNext = () => {
    let _items: ItemDivide[] = [];
    items.map((item, idx) => {
      const payload = {
        ...item.item,
        pricePerUser: Math.ceil(item.item.totalPrice / item.userArr.length),
      } as ItemDivide;
      _items.push(payload);
    });

    store.dispatch(setDivideItems({ title: divide.title, items: _items }));
    store.dispatch(setAssignedFriends({ friends: friends }));
    navigate('PaymentReceipient', { page: 'Divide' });
  };

  useEffect(() => {
    if (route.params) {
      let friendList: AssignFriend[] = [];
      const selectedFriends: UserDocument[] = [...route.params.selectedFriends];
      selectedFriends.map((friend, idx) => {
        const user = friend;
        const _user = {
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          username: user.username,
          payments: user.payments,
        } as UserDocument;
        friendList.push({ user: _user, selectedItem: [] });
      });
      setFriends(friendList);
    }
  }, []);

  useEffect(() => {
    if (divide) {
      let itemList: AssignItems[] = [];
      divide?.items?.map((item, idx) => {
        itemList.push({
          item: { itemName: item.itemName, price: item.price, qty: item.qty, totalPrice: item.totalPrice },
          userArr: [],
        });
      });
      setItems(itemList);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Divide
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Assign</Text>
          <View style={{ flex: 1 }}>
            <View>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                  {friends &&
                    friends.map((friend, idx) => {
                      return (
                        <TouchableOpacity key={idx} activeOpacity={0.85} onPress={() => setCurrIdx(idx)}>
                          <ImageView
                            key={idx.toString()}
                            name={'tree-1'}
                            remoteAssetFullUri={friend?.user?.avatar ?? ''}
                            // style={[styles.userAvatar, { border: `2px solid #29B029` }]}
                            style={[
                              styles.userAvatar,
                              { borderWidth: idx === currIdx ? 4 : 0, borderColor: colours.greenNormal },
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
            <ScrollView style={{ marginTop: 20, flex: 1 }}>
              <View style={{ flex: 1 }}>
                {items &&
                  items.map((item, idx) => {
                    return (
                      <AssignCard
                        key={idx}
                        idx={idx}
                        item={item.item}
                        active={
                          item.userArr.find((item) => item.username === friends[currIdx].user.username) !== undefined
                        }
                        users={item.userArr}
                        onPress={() => handleSelectItem(item, idx)}
                      />
                    );
                  })}
              </View>
            </ScrollView>
          </View>
          <CustomButton
            text='Next'
            style={{ borderRadius: 10, width: '50%', alignSelf: 'center', marginTop: 20 }}
            onPress={handleNext}
          />
        </View>
      </SubPage>
    </SafeAreaView>
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
});

export default DivideAssign;
