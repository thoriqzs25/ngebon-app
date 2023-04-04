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
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import * as Google from 'expo-auth-session/providers/google';

const AuthScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState<User>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '454004759004-if37fqse9j813lcthn2r54ae17mpjfc8.apps.googleusercontent.com',
    iosClientId: '454004759004-ig5hqa984es3beoams3ir4lhp8ks273j.apps.googleusercontent.com',
    expoClientId: '454004759004-c3l2um169nb33n1mnd1l8peikers2vm0.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'ngebonapp',
    }),
  });

  // const handleLogin = async () => {
  //   createUserWithEmailAndPassword(auth, email, pass)
  //     .then((userCred) => {
  //       const user = userCred.user;
  //       console.log('line 18 success login', user);
  //     })
  //     .catch((err) => {
  //       const errCode = err.code;
  //       const errMsg = err.message;

  //       console.log('line 24 error login', errCode, ', msg:', errMsg);
  //     });
  // };

  const handleGoogleLogin = async () => {
    const credential = GoogleAuthProvider.credential(null, token);

    signInWithCredential(auth, credential)
      .then((userCred) => {
        console.log('line 44', userCred);
        setUserInfo(userCred.user);
      })
      .catch((err) => {
        console.log('line 47', err);
      });
  };

  // const loginIos = async () => {
  //   const redirect = AuthSession.makeRedirectUri({
  //     scheme: 'ngebonapp',
  //     path: 'ngebon-app',
  //     preferLocalhost: true,
  //   });

  //   const request = new AuthSession.AuthRequest({
  //     clientId: '454004759004-ig5hqa984es3beoams3ir4lhp8ks273j.apps.googleusercontent.com',
  //     redirectUri: redirect,
  //     prompt: AuthSession.Prompt.SelectAccount,
  //     scopes: ['email', 'profile'],
  //   });

  //   const result = await request.promptAsync({
  //     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  //   });

  //   const code = JSON.parse(JSON.stringify(result)).params.code;
  // };

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
        <Text>{userInfo?.displayName ?? 'nothjing'}</Text>
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
            // loginIos();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
