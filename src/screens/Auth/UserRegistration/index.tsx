import CustomCarousel from '@src/components/CustomCarousel';
import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import { navigate } from '@src/navigation';
import { userLogin } from '@src/redux/actions/auth';
import { store } from '@src/redux/store';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import { checkUserRegistered } from '@src/utils/userCollection';
import { db } from 'firbaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const UserRegistration = () => {
  const { email, uid } = useSelector((store: RootState) => store.auth);

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleNextBtn = async () => {
    try {
      const res = await setDoc(doc(db, 'users', `${uid}`), {
        name: name,
        username: username,
        email: email,
        createdAt: serverTimestamp(),
      });
      console.log('line 27', res);

      const userExists = await checkUserRegistered(uid as string);
      if (userExists) store.dispatch(userLogin());
    } catch (e) {
      console.log('line 24 err', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Text style={[styles.title, { color: colours.greenNormal, marginVertical: 40 }]}>COMPLETE YOUR ACCOUNT</Text>
      <CustomCarousel />
      <View style={{ alignItems: 'center', padding: 24 }}>
        <Text style={[styles.title, { color: colours.greenOld }]}>USER CREDENTIALS</Text>
        <TextField titleAlt={'Full Name'} style={{ marginBottom: 12 }} setValue={setName} />
        <TextField titleAlt={'Username'} setValue={setUsername} />
        <CustomButton text='Next' onPress={handleNextBtn} style={styles.button} />
      </View>
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
