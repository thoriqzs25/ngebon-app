import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { navigate } from '@src/navigation';
import { UserDocument } from '@src/types/collection/usersCollection';
import { ItemRecord, UserRecord } from '@src/types/states/record';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { getFriendCollection } from '@src/utils/collections/friendCollection';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const RecordFriend = ({ route }: { route: RouteProp<{ params: { prevInputs: ItemRecord[] } }> }) => {
  const { user } = useSelector((state: RootState) => state);

  const [friends, setFriends] = useState<UserDocument[]>([]);
  const [prevRecordList, setPrevRecordList] = useState<ItemRecord[]>([]);

  const getFriends = async () => {
    const data = await getFriendCollection(user.uid!!);
    if (data) setFriends(data);
  };

  const handleSelect = (friend: UserDocument) => {
    let newRecords: ItemRecord[] = [];
    const _friend = {
      avatar: friend.avatar,
      email: friend.email,
      name: friend.name,
      username: friend.username,
      payments: friend.payments,
    } as UserRecord;

    if (!!prevRecordList && prevRecordList.length > 0) {
      newRecords = [...prevRecordList, { user: _friend, amount: '', note: '' }];
      prevRecordList.map((record, idx) => {
        if (record.user.username === friend.username) {
          newRecords = [...prevRecordList];
          return;
        }
      });
    } else newRecords = [{ user: _friend, amount: '', note: '' }];
    navigate('RecordPaymentAmount', { prevInputs: newRecords });
  };

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, [])
  );

  useEffect(() => {
    if (route.params) {
      setPrevRecordList(route.params.prevInputs);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Record ({prevRecordList.length > 0 ? 2 : 1}/5)
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose a Person</Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Choose user to add payment amount
          </Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard user={user} onPress={() => handleSelect(user as UserDocument)} />
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8 }]}>Friends</Text>
            <AddFriendCard onPress={() => navigate('AddFriend')} />
            {friends &&
              friends.map((friend, idx) => {
                return <UserCard key={idx} onPress={() => handleSelect(friend)} user={friend} />;
              })}
          </ScrollView>
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
});

export default RecordFriend;
