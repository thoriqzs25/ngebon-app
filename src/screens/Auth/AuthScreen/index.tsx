import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import colours from '@src/utils/colours';
import { auth, db } from 'firbaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import * as Google from 'expo-auth-session/providers/google';
import { store } from '@src/redux/store';
import { currentUser, userLogin } from '@src/redux/actions/auth';
import { collection, getDocs } from 'firebase/firestore';
import { navigate } from '@src/navigation';
import { checkUserRegistered, getUser } from '@src/utils/userCollection';
import { setUser } from '@src/redux/actions/user';

const AuthScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState<User>();

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: '454004759004-if37fqse9j813lcthn2r54ae17mpjfc8.apps.googleusercontent.com',
      iosClientId: '454004759004-ig5hqa984es3beoams3ir4lhp8ks273j.apps.googleusercontent.com',
      expoClientId: '454004759004-c3l2um169nb33n1mnd1l8peikers2vm0.apps.googleusercontent.com',
    },
    {
      scheme: 'ngebonapp',
    }
  );

  const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCred) => {
        const user = userCred.user;
        store.dispatch(currentUser({ email: user.email, uid: user.uid }));
        navigate('UserRegistration');
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;

        console.log('line 24 error login', errCode, ', msg:', errMsg);
      });
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCred) => {
        const user = userCred.user;
        store.dispatch(currentUser({ email: user.email, uid: user.uid }));

        checkUser(user.uid);
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
        const user = userCred.user;
        // store.dispatch(userLogin({ uid: user.uid, email: user.email }));
        setUserInfo(user);
        store.dispatch(currentUser({ email: user.email, uid: user.uid }));
        checkUser(user.uid);
      })
      .catch((err) => {
        console.log('line 47', err);
      });
  };

  const checkUser = async (userId: string) => {
    const userExists = await checkUserRegistered(userId);

    if (!userExists) {
      navigate('UserRegistration');
      console.log('User does not exist!');
    } else {
      store.dispatch(userLogin());
    }
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
          // gap: 6,
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
          style={{ width: '80%', backgroundColor: colours.gray500, marginBottom: 6 }}
          onPress={() => {
            handleLogin();
          }}
        />
        <CustomButton
          text='Register'
          style={{ width: '80%', backgroundColor: colours.gray500, marginBottom: 6 }}
          onPress={() => {
            handleRegister();
          }}
        />
        <CustomButton
          text='Google Sign-In'
          style={{ width: '80%', backgroundColor: colours.gray500 }}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
