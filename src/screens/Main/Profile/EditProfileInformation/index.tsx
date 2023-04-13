import CustomButton from '@src/components/input/CustomButton';
import { userLogout } from '@src/redux/actions/auth';
import { removeUser, setAvatar } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { useEffect, useState } from 'react';
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
import SubPage from '@src/components/SubPage';
import TextField from '@src/components/input/TextField';
import TextFieldAlt from '@src/components/input/TextFieldAlt';
import { navigate } from '@src/navigation';
import { updateUser } from '@src/utils/userCollection';
import { useNavigation } from '@react-navigation/native';

const EditProfileInformation = () => {
  // const { uid } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state);

  const { navigate, goBack, canGoBack } = useNavigation();

  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(user.username ?? '');
  const [name, setName] = useState<string>(user.name ?? '');
  const [email, setEmail] = useState<string>(user.email ?? '');

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
        const res = await updateDoc(doc(db, 'users', `${user.uid}`), {
          avatar: url,
        });

        store.dispatch(setAvatar({ avatar: url }));
      });
    });
  };

  const handleSave = () => {
    updateUser(name, user.uid!!);
    if (canGoBack()) goBack();
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? '');
      setName(user.name ?? '');
      setEmail(user.email ?? '');
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, marginBottom: 20 },
            ]}>
            Edit Profile Infromation
          </Text>
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
                remoteAssetFullUri={user.avatar}
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

          <TextFieldAlt
            value={username ?? ''}
            disable={true}
            title='Username'
            setValue={setUsername}
            style={styles.inputField}
          />
          <TextFieldAlt value={name ?? ''} title='Name' setValue={setName} style={styles.inputField} />
          <TextFieldAlt
            value={email ?? ''}
            disable={true}
            title='Email'
            setValue={setEmail}
            style={styles.inputField}
          />
          {/* <TextFieldAlt title='Password' setValue={() => null} style={styles.inputField} /> */}
          <CustomButton style={[styles.button]} text='Save' textStyle={styles.buttonText} onPress={handleSave} />
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
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
  inputField: {
    marginBottom: 12,
  },
  button: {
    width: 160,
    marginTop: 12,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
});

export default EditProfileInformation;
