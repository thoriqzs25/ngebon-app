import CustomButton from '@src/components/input/CustomButton';
import colours from '@src/utils/colours';
import { auth } from 'firbaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  User,
  signInWithEmailAndPassword,
  OAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { store } from '@src/redux/store';
import { currentUser, userLogin } from '@src/redux/actions/auth';
import { navigate } from '@src/navigation';
import { setAvatar, setUser } from '@src/redux/actions/user';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { checkUserRegistered, getUser } from '@src/utils/collections/userCollection';
import Constants from 'expo-constants';
import { moderateScale } from 'react-native-size-matters';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { IS_ANDROID } from '@src/utils/deviceDimensions';

const AuthScreen = () => {
  const authRedux = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: '454004759004-u235okt4rtgq8el89t65drfude5srpcv.apps.googleusercontent.com',
      iosClientId: '454004759004-e3b2k71pavhu3o37ts0ffcbpmm94k0th.apps.googleusercontent.com',
      expoClientId: '454004759004-c3l2um169nb33n1mnd1l8peikers2vm0.apps.googleusercontent.com',
    },
    {
      scheme: 'ngebon.app.com',
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
    setIsLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    const nonce = Math.random().toString(36).substring(2, 10);
    try {
      return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
        .then((hashedNonce) =>
          AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
            nonce: hashedNonce,
          })
        )
        .then((appleCredential) => {
          const { identityToken } = appleCredential;
          const provider = new OAuthProvider('apple.com');
          const credential = provider.credential({
            idToken: identityToken!,
            rawNonce: nonce,
          });

          signInWithCredential(auth, credential);
        })
        .catch((error) => {
          // ...
        });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        store.dispatch(currentUser({ email: user.email, uid: user.uid }));

        if (user.photoURL) store.dispatch(setAvatar({ avatar: user.photoURL }));

        checkUser(user.uid);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  const checkUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const userExists = await checkUserRegistered(userId);

      if (!userExists) {
        navigate('UserRegistration');
        console.log('User does not exist!');
      } else {
        await getUser(userId);
        store.dispatch(userLogin());
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.accessToken) setToken(response.authentication.accessToken);
      handleGoogleLogin();
    }
  }, [response, token]);

  useEffect(() => {
    if (authRedux.uid) checkUser(authRedux.uid);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', padding: 24 }}>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: colours.greenYoung,
          padding: 20,
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={[
            { fontFamily: 'dm-700', fontSize: moderateScale(20, 2), color: colours.greenNormal, textAlign: 'center' },
          ]}>
          {'Ngebon'}
        </Text>
        {/* {userInfo?.photoURL && (
          <Image
            source={{ uri: userInfo?.photoURL }}
            style={{ marginTop: 20, width: 120, height: 120, borderRadius: 20 }}
          />
        )} */}
        {isLoading && <ActivityIndicator animating={isLoading} />}

        {/* <TextField title='email' placeholderText='Masukkan email' setValue={setEmail} />
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
        /> */}
        <CustomButton
          text='Google Sign-In'
          style={{ width: '80%', marginTop: 20, marginBottom: 8, paddingVertical: 0, height: 44 }}
          onPress={() => {
            promptAsync();
          }}
          iconSize={16}
          iconColor='white'
          iconName='logo-google'
          textStyle={{ fontFamily: 'dm-700', fontSize: 20, marginTop: 4, marginLeft: 4, lineHeight: 20 }}
        />
        {isAppleLoginAvailable && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={24}
            style={{ width: '80%', height: 48 }}
            onPress={handleAppleLogin}
          />
        )}

        <Text
          style={[{ fontFamily: 'dm-700', fontSize: moderateScale(12, 2), color: 'rgba(0,0,0,0.5)', marginTop: 12 }]}>
          {Constants?.manifest?.version}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
