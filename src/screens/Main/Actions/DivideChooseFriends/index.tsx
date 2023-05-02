import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { getFriendCollection } from '@src/utils/collections/friendCollection';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const DivideChooseFriends = () => {
  const { user } = useSelector((state: RootState) => state);

  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);
  const [friends, setFriends] = useState<UserDocument[]>([]);

  const handleCheck = (index: number, isChecked: boolean) => {
    if (isChecked && !checkedItems.includes(index)) {
      setCheckedItems([...checkedItems, index]);
    } else if (!isChecked) {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    }
  };

  const getFriends = async () => {
    const data = await getFriendCollection(user.uid!!);
    if (data) setFriends(data);
  };

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, [])
  );

  // useEffect(() => {
  //   getFriends();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(50, -1.5) }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Divide
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose Friends</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard
              onPress={() => null}
              withCheckBox={true}
              onCheckChanged={(isChecked: boolean) => handleCheck(0, isChecked)}
              isChecked={checkedItems.includes(0)}
              user={user}
            />
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8 }]}>Friends</Text>
            <AddFriendCard onPress={() => navigate('AddFriend')} />
            {friends &&
              friends.map((friend, idx) => {
                return (
                  <UserCard
                    key={idx}
                    onPress={() => null}
                    withCheckBox={true}
                    isChecked={checkedItems.includes(idx + 1)}
                    onCheckChanged={(isChecked: boolean) => handleCheck(idx + 1, isChecked)}
                    user={friend}
                  />
                );
              })}
          </ScrollView>
          <CustomButton
            text='Next'
            style={{ borderRadius: 10, width: '50%', alignSelf: 'center', marginTop: 20 }}
            onPress={() => {
              checkedItems.sort((a, b) => a - b);
              const selectedFriends =
                // checkedItems.includes(0) && user,
                checkedItems.map((idx) => {
                  if (idx === 0) return user;
                  return friends[idx - 1];
                });

              navigate('DivideAssign', { selectedFriends: selectedFriends });
            }}
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
});

export default DivideChooseFriends;
