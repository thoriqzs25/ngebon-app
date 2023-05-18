import CustomButton from '@src/components/input/CustomButton';
import { userLogout } from '@src/redux/actions/auth';
import { removeUser, setAvatar } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';
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
import { checkUsernameRegistered, updateUser } from '@src/utils/collections/userCollection';
import { useNavigation } from '@react-navigation/native';

const EditProfileInformation = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state);

  const { navigate, goBack, canGoBack } = useNavigation();

  const [image, setImage] = useState<string | null>(user.avatar ?? '');
  const [username, setUsername] = useState<string>(user.username ?? '');
  const [usernameError, setUsernameError] = useState<string>('Required field');
  const [name, setName] = useState<string>(user.name ?? '');
  const [email, setEmail] = useState<string>(user.email ?? '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const reference = ref(storage, `profile-picture/${username}.jpg`);

      const response = await fetch(uri);
      const bytes = await response.blob();

      await uploadBytes(reference, bytes);

      const url = await getDownloadURL(reference).then((url) => {
        return url;
      });

      await updateDoc(doc(db, 'users', `${uid}`), {
        avatar: url,
      });
      store.dispatch(setAvatar({ avatar: url }));
    } catch (err) {
      console.log('line 66', err);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (username === undefined || username === null || username === '') {
        setUsernameError('Username is required');
        return;
      }

      const isExists = await checkUsernameRegistered(username);
      if (isExists || username.toLowerCase().includes('guest')) {
        setUsernameError('Username has already been taken');
        return;
      } else {
        setUsernameError('');
      }

      await updateUser(name, username, user.uid!!);
      await uploadImage(image!!);
      canGoBack() && goBack();
    } catch (e) {
      __DEV__ && console.log('line 99', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? '');
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setImage(user.avatar ?? '');
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
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={pickImage}
            containerStyle={{
              marginBottom: 12,
              alignSelf: 'center',
              width: moderateScale(100, 2),
              height: moderateScale(100, 2),
            }}>
            <View
              style={{
                position: 'relative',
              }}>
              <ImageView
                name={'tree-1'}
                remoteAssetFullUri={image}
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
          {isLoading && <ActivityIndicator animating={isLoading} />}
          <TextFieldAlt
            value={username ?? ''}
            disable={user.username !== undefined && user.username !== null && user.username !== ''}
            title='Username'
            setValue={setUsername}
            style={styles.inputField}
            error={usernameError !== ''}
          />
          {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
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
    marginTop: 12,
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
  errorText: {
    fontFamily: 'dm',
    color: colours.redNormal,
  },
});

export default EditProfileInformation;
