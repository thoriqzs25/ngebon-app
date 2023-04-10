import CustomButton from '@src/components/input/CustomButton';
import { userLogout } from '@src/redux/actions/auth';
import { removeUser, setAvatar } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from 'firbaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import ImageView from '@src/components/ImageView';
import { moderateScale } from 'react-native-size-matters';

const Profile = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const { avatar } = useSelector((state: RootState) => state.user);

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
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      <ImageView
        name={'tree-1'}
        remoteAssetFullUri={avatar}
        style={{
          width: moderateScale(100, 2),
          height: moderateScale(100, 2),
          alignSelf: 'center',
          marginBottom: 12,
          borderRadius: moderateScale(46, 2),
        }}
      />
      <CustomButton
        text='Logout'
        style={{ paddingHorizontal: 28, backgroundColor: colours.redNormal }}
        onPress={() => {
          store.dispatch(userLogout());
          store.dispatch(removeUser());
        }}
      />
    </View>
  );
};

export default Profile;
