import { useNavigation, useRoute } from '@react-navigation/native';
import CustomCarousel from '@src/components/CustomCarousel';
import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import { RootState } from '@src/types/states/root';
import { checkUsernameRegistered, getUser } from '@src/utils/collections/userCollection';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { db, storage } from 'firbaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const UserRegistration = () => {
  const { email, uid } = useSelector((store: RootState) => store.auth);
  const { avatar } = useSelector((store: RootState) => store.user);

  const { goBack, canGoBack } = useNavigation();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [dummyImg, setDummyImg] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNextBtn = async () => {
    setIsLoading(true);
    try {
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      const isValid = usernameRegex.test(username);
      if (!isValid) {
        setUsernameError('Username can only contain letters (a-z), numbers (0-9), and underscore (_).');
        return;
      }

      const isExists = await checkUsernameRegistered(username);
      if (isExists || username.toLowerCase().includes('guest')) {
        setUsernameError('Username has already been taken');
        return;
      } else {
        setUsernameError('');
      }

      if (uid) {
        const user = await updateDoc(doc(db, 'users', `${uid}`), {
          username: username,
        }).then(async () => {
          await getUser(uid);
        });
      }

      canGoBack() && goBack();
    } catch (e) {
      console.log('line 24 err', e);
    } finally {
      setIsLoading(false);
    }
  };

  const getDummyImg = async () => {
    const img = await getDownloadURL(ref(storage, 'images/tree_1.webp'));
    setDummyImg(img);
  };

  useEffect(() => {
    getDummyImg();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <KeyboardAvoidingView
        behavior={IS_ANDROID ? 'height' : 'position'}
        keyboardVerticalOffset={IS_ANDROID ? -70 : -200}
        style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colours.greenNormal, marginVertical: 40 }]}>COMPLETE YOUR ACCOUNT</Text>
        <CustomCarousel />
        <View style={{ alignItems: 'center', padding: 24 }}>
          <Text style={[styles.title, { color: colours.greenOld }]}>PICK USERNAME</Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 40, color: 'rgba(0,0,0,0.5)' }]}>
            A username is required to initiate any actions.
          </Text>
          {isLoading && <ActivityIndicator style={{ marginBottom: 12 }} animating={isLoading} />}
          <TextField
            error={usernameError !== ''}
            titleAlt={'Username'}
            style={{ marginBottom: 12 }}
            setValue={setUsername}
          />
          {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
          <CustomButton text='Create' disabled={username === ''} onPress={handleNextBtn} style={styles.button} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'dm-500',
    marginBottom: 10,
  },
  button: { borderRadius: 12, paddingHorizontal: 60, marginTop: 40 },
  dmBold: {
    fontFamily: 'dm-700',
  },
  errorText: {
    fontFamily: 'dm',
    color: colours.redNormal,
  },
});

export default UserRegistration;
