import { navigate } from '@src/navigation';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ImageView from '@src/components/ImageView';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyle } from '@src/utils/globalStyles';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import colours from '@src/utils/colours';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { UserDocument } from '@src/types/collection/usersCollection';
import { ItemRecord } from '@src/types/states/record';
import { getFriendCollection } from '@src/utils/collections/friendCollection';
import { useFocusEffect } from '@react-navigation/native';
import AddFriendCard from '@src/components/AddFriendCard';
import UserCard from '@src/components/UserCard';
import { callGoogleVisionAsync } from '@src/utils/ocrHelper';
import { moderateScale } from 'react-native-size-matters';

const Friends = () => {
  const { user } = useSelector((state: RootState) => state);
  const { username } = useSelector((state: RootState) => state.user);

  const [friends, setFriends] = useState<UserDocument[]>([]);
  const [prevRecordList, setPrevRecordList] = useState<ItemRecord[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFriends = async () => {
    const data = await getFriendCollection(user.uid!!);
    if (data) setFriends(data);
  };

  const handleAddFriend = () => {
    if (username !== undefined) {
      navigate('AddFriend');
    } else {
      navigate('UserRegistration');
    }
  };

  const pickImage = async () => {
    setIsLoading(true);
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const googleText = await callGoogleVisionAsync(result.assets[0].base64);
        console.log('line 51', googleText);
        // uploadImage(uri);

        setImage(uri);
        setText(googleText.text);
      }
    } catch {
      console.log('line 38 err');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFriends();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={[
            { width: '100%', height: '100%', paddingBottom: 40 },
            globalStyle.paddingHorizontal,
            IS_ANDROID && globalStyle.paddingTop,
          ]}>
          <Text style={styles.page}>Friends</Text>
          <AddFriendCard onPress={handleAddFriend} />
          {friends &&
            friends.map((friend, idx) => {
              return <UserCard key={idx} user={friend} />;
            })}
          {/* <CustomButton text='Open Image' style={{ paddingHorizontal: 20, borderRadius: 8 }} onPress={pickImage} /> */}

          {friends.length === 0 && (
            <Text
              style={[
                // styles.dmBold,
                {
                  marginTop: 12,
                  textAlign: 'center',
                  fontFamily: 'dm-700',
                  paddingHorizontal: 20,
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: moderateScale(12, 2),
                },
              ]}>
              Add friend by username
            </Text>
          )}
          {image && <ImageView remoteAssetFullUri={image} style={{ width: 400, height: 300, resizeMode: 'contain' }} />}
          <Text>{text}</Text>
          <ActivityIndicator animating={isLoading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    marginTop: 16,
    shadowOpacity: 0.4,
    shadowColor: '#000',
    backgroundColor: colours.white,
  },
  page: {
    color: colours.greenNormal,
    fontFamily: 'dm-700',
    fontSize: 24,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'dm-700',
    fontSize: 20,
    alignSelf: 'center',
  },
  username: {
    fontFamily: 'dm',
    fontSize: 14,
    alignSelf: 'center',
  },
  action: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'dm',
    marginLeft: 8,
    // fontSize: 18,
  },
});

export default Friends;
