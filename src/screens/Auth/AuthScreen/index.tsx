import CustomButton from '@src/components/Input/CustomButton';
import TextField from '@src/components/Input/TextField';
import colours from '@src/utils/colours';
import { auth } from 'firbaseConfig';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleLogin = async () => {
    console.log(email, pass);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCred) => {
        const user = userCred.user;
        console.log('line 18 success login', user);
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;

        console.log('line 24 error login', errCode, ', msg:', errMsg);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', padding: 24 }}>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: colours.blueNormal,
          padding: 20,
          width: '100%',
          gap: 6,
          alignItems: 'center',
        }}>
        <TextField title='email' placeholderText='Masukkan email' setValue={setEmail} />
        <TextField
          title='password'
          placeholderText='Masukkan password'
          setValue={setPass}
          style={{ marginBottom: 12 }}
        />
        <CustomButton
          text='Login'
          style={{ width: '80%', backgroundColor: colours.gray500 }}
          onPress={() => handleLogin()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
