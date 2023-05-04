import { RouteProp, useFocusEffect } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { navigate } from '@src/navigation';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { getFriendCollection } from '@src/utils/collections/friendCollection';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { UserRecord } from '@src/types/states/record';
import { setReceipient } from '@src/redux/actions/record';
import { store } from '@src/redux/store';

const PaymentReceipient = ({ route }: { route: RouteProp<{ params?: { page?: string } }> }) => {
  const { user, record } = useSelector((state: RootState) => state);

  const [friends, setFriends] = useState<UserDocument[]>([]);

  const getFriends = async () => {
    const data = await getFriendCollection(user.uid!!);
    if (data) setFriends(data);
  };

  const handleSelect = (friend: UserDocument) => {
    const _friend = {
      avatar: friend.avatar,
      email: friend.email,
      name: friend.name,
      username: friend.username,
      payments: friend.payments,
    } as UserRecord;

    store.dispatch(setReceipient({ receipient: _friend }));
    setFriends([]);

    navigate('ActionsPaymentDetails', { page: route?.params?.page });
  };

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            {route.params?.page ? (route.params?.page === 'Divide' ? 'Divide (5/7)' : 'Record (3/5)') : ''}
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Payment Receipient
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Choose user to be receipient of debts
          </Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            {user && <UserCard onPress={() => handleSelect(user as UserDocument)} user={user} />}
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
  button: {
    width: 160,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
});

export default PaymentReceipient;
