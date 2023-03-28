import CustomButton from '@src/components/Input/CustomButton';
import TextField from '@src/components/Input/TextField';
import colours from '@src/utils/colours';
import { auth } from 'firbaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import * as Google from 'expo-auth-session/providers/google';

const AuthScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '454004759004-if37fqse9j813lcthn2r54ae17mpjfc8.apps.googleusercontent.com',
    iosClientId: '454004759004-ig5hqa984es3beoams3ir4lhp8ks273j.apps.googleusercontent.com',
    expoClientId: '454004759004-c3l2um169nb33n1mnd1l8peikers2vm0.apps.googleusercontent.com',
  });

  const handleLogin = async () => {
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

  const handleGoogleLogin = async () => {
    const credential = GoogleAuthProvider.credential(null, token);

    signInWithCredential(auth, credential)
      .then((userCred) => {
        console.log('line 44', userCred);
      })
      .catch((err) => {
        console.log('line 47', err);
      });

    // try {
    //   if (!token) throw Error('No token found');
    //   const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   console.log('response line 47', response, response.json());
    //   const user = await response.json();
    //   console.log('line 51', user.authentication.idToken, user.authentication.accessToken);
    //   // const credential = GoogleAuthProvider.credential(user.authentication.idToken, user.authentication.accessToken);

    //   setUserInfo(user);
    // } catch (error) {
    //   console.log('line 53', error);
    // }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.accessToken) setToken(response.authentication.accessToken);
      handleGoogleLogin();
    }
  }, [response, token]);

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
          onPress={() => {
            // handleLogin();
            promptAsync();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
