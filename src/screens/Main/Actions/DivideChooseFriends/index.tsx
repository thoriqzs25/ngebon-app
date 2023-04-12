import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { getFriendCollection } from '@src/utils/friendCollection';
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
    console.log('line 25 check!', isChecked, checkedItems.includes(index), checkedItems);
    if (isChecked && !checkedItems.includes(index)) {
      console.log('line 26', isChecked, index);
      setCheckedItems([...checkedItems, index]);
    } else if (!isChecked) {
      console.log('line 29', isChecked, index);
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
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose Friends</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard
              onPress={() => null}
              withCheckBox={true}
              onCheckChanged={(isChecked: boolean) => handleCheck(90, isChecked)}
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
              const selectedFriends = checkedItems.map((idx) => friends[idx - 1]);
              console.log('line 83', checkedItems);
              // console.log('line 83', checkedItems, selectedFriends);
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
