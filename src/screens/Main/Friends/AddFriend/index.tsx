import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import CustomButton from '@src/components/input/CustomButton';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { addNewFriend, getFriendCollection } from '@src/utils/collections/friendCollection';
import { getUserByUsername } from '@src/utils/collections/userCollection';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AddFriend = () => {
  const { username: currUsername, uid } = useSelector((state: RootState) => state.user);

  const [friendList, setFriendList] = useState<UserDocument[]>([]);
  const [username, setUsername] = useState<string>('');
  const [friend, setFriend] = useState<UserDocument | null>(null);
  const [friendId, setFriendId] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { goBack, canGoBack } = useNavigation();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      await getFriends();
      const data = await getUserByUsername(username).then((res) => {
        if (Object.keys(res.data).length !== 0) {
          setFriend(res.data as UserDocument);
        }
        if (res.id) {
          setFriendId(res.id);
        }
      });
    } catch {
      __DEV__ && console.log('line 42');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFriend = async () => {
    setIsLoading(true);
    try {
      await addNewFriend({
        userId: uid!!,
        friendId: friendId!!,
        userUname: currUsername!!,
        friendUname: friend!!.username!!,
      });
      await getFriends();
    } catch {
      __DEV__ && console.log('line 58');
    } finally {
      setIsLoading(false);
      canGoBack() && goBack();
    }
  };

  const getFriends = async () => {
    const data = await getFriendCollection(uid!!);
    if (data) setFriendList(data);
  };

  const checkIfFriendAdded = () => {
    let flag = false;
    friendList.map((fr) => {
      if (fr.username === friend?.username) return (flag = true);
    });

    console.log('line 50', flag);
    return flag;
  };

  useEffect(() => {
    console.log('line 84', friend);
    setIsAdded(checkIfFriendAdded());
  }, [friend, friendList]);

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

            {friend ? (
              <View style={{ marginTop: 40 }}>
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
                  {friend !== null ? friend.name : 'Loading...'}
                </Text>
              </View>
            ) : isLoading ? (
              <View style={{ marginTop: 40 }}>
                <ActivityIndicator animating={isLoading} />
              </View>
            ) : (
              <View style={{ marginTop: 40, alignSelf: 'center' }}>
                <Text style={styles.dmFont}>Not Found</Text>
              </View>
            )}

            <CustomButton
              disabled={username === currUsername || isAdded || (!!friend?.username && isLoading)}
              text={username === currUsername ? `It's You` : isAdded ? 'Added' : friend !== null ? 'Add' : 'Search'}
              style={{
                // paddingVertical: 16,
                marginTop: 40,
                borderRadius: 10,
                width: '40%',
                backgroundColor: colours.greenNormal,
                alignSelf: 'center',
              }}
              onPress={() => {
                username === currUsername ? null : friend !== null ? handleAddFriend() : handleSearch();
              }}
              textStyle={{ fontSize: 16 }}
            />

            {!!friend?.username && isLoading && (
              <View style={{ marginTop: 40 }}>
                <ActivityIndicator animating={isLoading} />
              </View>
            )}
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
