import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import ImageView from '@src/components/ImageView';
import CustomButton from '@src/components/input/CustomButton';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { navigate } from '@src/navigation';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { getFriendCollection } from '@src/utils/friendCollection';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const RecordFriend = ({ route }: { route: RouteProp<{ params: { recordFriends: UserDocument[] } }> }) => {
  const { user } = useSelector((state: RootState) => state);

  const [friends, setFriends] = useState<UserDocument[]>([]);
  const [prevRecordList, setPrevRecordList] = useState<UserDocument[]>([]);

  const getFriends = async () => {
    const data = await getFriendCollection(user.uid!!);
    if (data) setFriends(data);
  };

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, [])
  );

  useEffect(() => {
    if (route.params) {
      setPrevRecordList(route.params.recordFriends);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose a Person</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard onPress={() => null} user={user} />
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8 }]}>Friends</Text>
            <AddFriendCard onPress={() => navigate('AddFriend')} />
            {friends &&
              friends.map((friend, idx) => {
                return (
                  <UserCard
                    key={idx}
                    onPress={() => {
                      let newRecords = [...prevRecordList, friend];

                      prevRecordList.map((record, idx) => {
                        if (record.username === friend.username) {
                          console.log('line 66');
                          newRecords = [...prevRecordList];
                          return;
                        }
                      });

                      navigate('PaymentPage', { recordFriends: newRecords });
                    }}
                    user={friend}
                  />
                );
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
