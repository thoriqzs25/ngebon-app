import CustomCarousel from '@src/components/CustomCarousel';
import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import { navigate } from '@src/navigation';
import { userLogin } from '@src/redux/actions/auth';
import { store } from '@src/redux/store';
import { FriendDocument } from '@src/types/collection/friendsCollection';
import { UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import { checkUserRegistered, checkUsernameRegistered } from '@src/utils/collections/userCollection';
import { createEmptyDocument } from '@src/utils/collections/user_debtCollection';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { app, db, storage } from 'firbaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const UserRegistration = () => {
  const { email, uid } = useSelector((store: RootState) => store.auth);
  const { avatar } = useSelector((store: RootState) => store.user);

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [dummyImg, setDummyImg] = useState<string>('');

  const handleNextBtn = async () => {
    const newUserDoc = {
      name: name,
      username: username,
      email: email,
      createdAt: serverTimestamp(),
      avatar: avatar ?? dummyImg ?? '',
      payments: [],
    } as UserDocument;

    const newFriendDoc = {
      allFriends: [],
      ownRequests: [],
      friendRequests: [],
    } as FriendDocument;

    try {
      const isExists = await checkUsernameRegistered(username);
      if (isExists || username.toLowerCase().includes('guest')) return;

      const resUser = await setDoc(doc(db, 'users', `${uid}`), newUserDoc, { merge: true });
      const resFriend = await setDoc(doc(db, 'friends', `${uid}`), newFriendDoc, { merge: true });
      await createEmptyDocument(username);

      const userExists = await checkUserRegistered(uid as string);
      if (userExists) store.dispatch(userLogin());
    } catch (e) {
      console.log('line 24 err', e);
    }
  };

  const getDummyImg = async () => {
    //  const spaceRef = ref(storage, 'images/space.jpg');
    // const imageRef = spaceRef.parent;
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
          <Text style={[styles.title, { color: colours.greenOld }]}>USER CREDENTIALS</Text>
          <TextField titleAlt={'Full Name'} style={{ marginBottom: 12 }} setValue={setName} />
          <TextField titleAlt={'Username'} setValue={setUsername} />
          <CustomButton text='Next' onPress={handleNextBtn} style={styles.button} />
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
    marginBottom: 40,
  },
  button: { borderRadius: 12, paddingHorizontal: 60, marginTop: 40 },
});

export default UserRegistration;
