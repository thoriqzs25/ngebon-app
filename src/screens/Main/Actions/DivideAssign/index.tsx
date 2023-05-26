import { RouteProp, useFocusEffect } from '@react-navigation/native';
import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { resetAssignedFriends, setAssignedFriends, setDivideItems } from '@src/redux/actions/divide';
import { store } from '@src/redux/store';
import { UserDocument } from '@src/types/collection/usersCollection';
import { AssignFriend, AssignItems, ItemDivide, ItemParts } from '@src/types/states/divide';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import AssignCard from './AssignCard';

const DivideAssign = ({ route }: { route: RouteProp<{ params: { selectedFriends: UserDocument[] } }> }) => {
  const { divide } = useSelector((state: RootState) => state);

  const [currIdx, setCurrIdx] = useState<number>(0);
  const [items, setItems] = useState<AssignItems[]>([]);
  const [friends, setFriends] = useState<AssignFriend[]>([]);

  const handleSelectItem = (item: AssignItems, idx: number) => {
    const prevItems = [...items];
    const prevFriends = [...friends];

    if (prevItems[idx].userArr.find((item) => item.username === friends[currIdx].user.username) === undefined) {
      prevItems[idx].userArr.push(friends[currIdx].user);
      const _fullParts = prevItems[idx].item.fullParts;
      prevItems[idx].item.fullParts = _fullParts + 1;
      // prevItems[idx].userArr.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));
      setItems(prevItems);
    } else {
      const userArr = prevItems[idx].userArr.filter((user) => user.username !== friends[currIdx].user.username);
      prevItems[idx].userArr = userArr;

      const _selectedItems = prevFriends[currIdx].selectedItem.find((item) => item.itemIdx === idx);
      if (_selectedItems) {
        const _parts = _selectedItems?.parts;
        prevItems[idx].item.fullParts = prevItems[idx].item.fullParts - _parts;
        setItems(prevItems);
      }
    }

    if (prevFriends[currIdx].selectedItem.find((itemParts) => itemParts.itemIdx === idx) === undefined) {
      prevFriends[currIdx].selectedItem.push({ itemIdx: idx, parts: 1 });

      // prevFriends[currIdx].selectedItem.sort((a, b) => a - b);
      setFriends(prevFriends);
    } else {
      const selectedItemArr = prevFriends[currIdx].selectedItem.filter((itemParts) => itemParts.itemIdx !== idx);
      prevFriends[currIdx].selectedItem = selectedItemArr;
      setFriends(prevFriends);
    }
  };

  const handleIncrementParts = (idx: number) => {
    const prevItems = [...items];
    const prevFriends = [...friends];

    const _fullParts = prevItems[idx].item.fullParts;
    const _selectedItems = prevFriends[currIdx].selectedItem;
    let _parts = 1;

    _selectedItems.forEach((itemParts) => {
      if (itemParts.itemIdx === idx) _parts = itemParts.parts;
    });

    prevItems[idx].item.fullParts = _fullParts + 1;

    const _item = prevFriends[currIdx].selectedItem.find((itemParts) => {
      return itemParts.itemIdx === idx;
    });

    if (_item) {
      _item.parts = _parts + 1;
    }

    setItems(prevItems);
    setFriends(prevFriends);
  };

  const handleDecrementParts = (idx: number) => {
    const prevItems = [...items];
    const prevFriends = [...friends];

    const _fullParts = prevItems[idx].item.fullParts;
    const _selectedItems = prevFriends[currIdx].selectedItem;
    let _parts = 1;

    _selectedItems.forEach((itemParts) => {
      if (itemParts.itemIdx === idx) _parts = itemParts.parts;
    });

    if (_fullParts - 1 <= 0 || _parts - 1 <= 0) return;

    prevItems[idx].item.fullParts = _fullParts - 1;

    const _item = prevFriends[currIdx].selectedItem.find((itemParts) => {
      return itemParts.itemIdx === idx;
    });

    if (_item) {
      _item.parts = _parts - 1;
    }

    setItems(prevItems);
    setFriends(prevFriends);
  };

  const handleNext = () => {
    let allAssigned = true;
    const _items = items.map((item) => {
      if (item.userArr.length === 0) allAssigned = false;
      return { ...item.item };
    });
    const _friends = [...friends];
    const _title = divide.title;

    if (allAssigned) {
      store.dispatch(setDivideItems({ title: _title, items: _items }));
      store.dispatch(setAssignedFriends({ friends: _friends }));
      // setFriends([]);
      // setItems([]);
      setCurrIdx(0);
      navigate('PaymentReceipient', { page: 'Divide' });
    }
  };

  useFocusEffect(
    useCallback(() => {
      store.dispatch(resetAssignedFriends());
    }, [])
  );

  useEffect(() => {
    if (divide) {
      let _itemList: AssignItems[] = [];

      divide?.items?.map((item, idx) => {
        _itemList.push({
          item: {
            itemName: item.itemName,
            price: item.price,
            qty: item.qty,
            totalPrice: item.totalPrice,
            fullParts: 0,
          },
          userArr: [],
        });
      });
      setItems(_itemList);
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params && friends.length === 0) {
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
  }, [divide]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Divide (4/7)
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Assign</Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Assign user to items
          </Text>
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
                    const _active =
                      item.userArr.find((item) => item.username === friends[currIdx].user.username) !== undefined;
                    return (
                      <AssignCard
                        key={idx}
                        idx={idx}
                        currFriendIdx={currIdx}
                        item={item.item}
                        active={_active}
                        users={item.userArr}
                        incrementParts={() => handleIncrementParts(idx)}
                        decrementParts={() => handleDecrementParts(idx)}
                        friends={friends}
                        // partsValue={_active ? friends[currIdx].selectedItem[idx].parts ?? 1 : 0}
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

export default DivideAssign;
