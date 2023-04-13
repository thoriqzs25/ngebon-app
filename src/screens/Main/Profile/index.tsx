import CustomButton from '@src/components/input/CustomButton';
import { userLogout } from '@src/redux/actions/auth';
import { removeUser, setAvatar } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from 'firbaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import ImageView from '@src/components/ImageView';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyle } from '@src/utils/globalStyles';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { navigate } from '@src/navigation';

const Card = ({ children }: { children: JSX.Element }) => {
  return <View style={styles.card}>{children}</View>;
};

const Profile = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const { avatar, username, name } = useSelector((state: RootState) => state.user);

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      uploadImage(uri);

      setImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const blob = (await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    })) as Blob;
    const imgRef = ref(storage, 'images/test.jpg');

    uploadBytes(imgRef, blob).then((snapshot) => {
      getDownloadURL(imgRef).then(async (url) => {
        const res = await updateDoc(doc(db, 'users', `${uid}`), {
          avatar: url,
        });

        store.dispatch(setAvatar({ avatar: url }));
      });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          { width: '100%', height: '100%' },
          globalStyle.paddingHorizontal,
          IS_ANDROID && globalStyle.paddingTop,
        ]}>
        <Text style={styles.page}>Profile</Text>
        {/* <Button title='Pick an image from camera roll' onPress={pickImage} /> */}
        <TouchableOpacity activeOpacity={0.85} onPress={pickImage}>
          <View
            style={{
              alignSelf: 'center',
              position: 'relative',
              width: moderateScale(100, 2),
              height: moderateScale(100, 2),

              marginBottom: 12,
            }}>
            <ImageView
              name={'tree-1'}
              remoteAssetFullUri={avatar}
              style={{
                width: moderateScale(100, 2),
                height: moderateScale(100, 2),
                alignSelf: 'center',
                borderRadius: moderateScale(46, 2),
              }}
            />

            <View
              style={{
                backgroundColor: '#F5F5F5',
                width: 42,
                height: 42,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colours.white,
                borderWidth: 4,
                position: 'absolute',
                right: -12,
                bottom: -12,
              }}>
              <Feather name='edit-3' size={24} color='black' />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.username} numberOfLines={1}>
          {username}
        </Text>
        <Card>
          <View>
            <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('EditProfileInformation')}>
              <View style={styles.action}>
                <MaterialCommunityIcons name='account-edit-outline' size={24} color='black' />
                <Text style={styles.actionText}>Edit Profile Information</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.75}>
              <View style={styles.action}>
                <Ionicons name='card-outline' size={20} />
                <Text style={styles.actionText}>Payment Details</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
        <Card>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              store.dispatch(userLogout());
              store.dispatch(removeUser());
            }}>
            <View style={styles.action}>
              <Ionicons name='log-out-outline' size={20} />
              <Text style={styles.actionText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
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
    fontFamily: 'dm-500',
    fontSize: 24,
    marginBottom: 60,
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

export default Profile;
