import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { addNewFriend } from '@src/utils/friendCollection';
import { db } from 'firbaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const AddFriend = () => {
  const { username: currUsername, uid } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState<string>('');
  const [friend, setFriend] = useState<UserDocument | null>(null);
  const [friendId, setFriendId] = useState<string | null>(null);

  const handleSearch = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', `${username}`));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 1)
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setFriend(data as UserDocument);
        setFriendId(doc.id);
      });
    else console.log('no user found line 32');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={IS_ANDROID ? 'height' : 'padding'}
        keyboardVerticalOffset={IS_ANDROID ? -70 : -80}
        style={{ flex: 1 }}>
        <SubPage>
          <View style={{ flex: 1, paddingBottom: moderateVerticalScale(160, -1.5) }}>
            <Text
              style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
              Add Friend
            </Text>
            <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Find Your Friend</Text>

            <TextInput
              onChangeText={(text) => {
                setUsername(text);
                setFriend(null);
              }}
              style={{
                backgroundColor: colours.backgroundCustom,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: IS_ANDROID ? 4 : 8,
                fontFamily: 'dm',
              }}
            />

            <View style={{ marginVertical: 40 }}>
              <ImageView
                name={'tree-1'}
                remoteAssetFullUri={friend?.avatar}
                style={{
                  width: moderateScale(100, 2),
                  height: moderateScale(100, 2),
                  alignSelf: 'center',
                  marginBottom: 12,
                  borderRadius: moderateScale(46, 2),
                }}
              />
              <Text style={{ fontFamily: 'dm', fontSize: 20, alignSelf: 'center' }}>
                {friend !== null ? friend.name : 'Jisoo'}
              </Text>
            </View>

            <CustomButton
              disabled={username === currUsername}
              text={username === currUsername ? `It's You :D` : friend !== null ? 'Add' : 'Search'}
              style={{
                // paddingVertical: 16,
                borderRadius: 10,
                width: '40%',
                backgroundColor: colours.greenNormal,
                alignSelf: 'center',
              }}
              onPress={() => {
                username === currUsername
                  ? null
                  : friend !== null
                  ? addNewFriend({
                      userId: uid!!,
                      friendId: friendId!!,
                      userUname: currUsername!!,
                      friendUname: friend.username,
                    })
                  : handleSearch();
              }}
              textStyle={{ fontSize: 16 }}
            />
          </View>
        </SubPage>
      </KeyboardAvoidingView>
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

export default AddFriend;
