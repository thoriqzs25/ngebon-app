import CustomButton from '@src/components/input/CustomButton';
import colours from '@src/utils/colours';
import { auth, db, storage } from 'firbaseConfig';
import { signInWithCredential, GoogleAuthProvider, OAuthProvider, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import { store } from '@src/redux/store';
import { currentUser, userLogin } from '@src/redux/actions/auth';
import { setAvatar } from '@src/redux/actions/user';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { checkUserRegistered, getUser } from '@src/utils/collections/userCollection';
import Constants from 'expo-constants';
import { moderateScale } from 'react-native-size-matters';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { UserDocument } from '@src/types/collection/usersCollection';
import { FriendDocument } from '@src/types/collection/friendsCollection';
import { getDownloadURL, ref } from 'firebase/storage';

const AuthScreen = () => {
  const authRedux = useSelector((state: RootState) => state.auth);

  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);
  const [dummyImg, setDummyImg] = useState<string>('');

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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential).then((userCred) => {
        const user = userCred.user;
        if (user) {
          const payload = {
            displayName: user.displayName ?? '',
            email: user.email ?? '',
            photoURL: user.photoURL ?? '',
          };
          registerUser(payload, user.uid);

          store.dispatch(currentUser({ email: user.email, uid: user.uid }));

          if (user.photoURL) store.dispatch(setAvatar({ avatar: user.photoURL }));

          checkUser(user.uid);
        }
      });
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
          const fixDisplayNameFromApple = [
            appleCredential.fullName?.givenName ?? '',
            appleCredential.fullName?.familyName ?? '',
          ]
            .join(' ')
            .trim();
          const { identityToken } = appleCredential;
          const provider = new OAuthProvider('apple.com');
          const credential = provider.credential({
            idToken: identityToken!,
            rawNonce: nonce,
          });

          signInWithCredential(auth, credential).then((userCred) => {
            const user = userCred.user;
            if (user.displayName === null) {
              updateProfile(user, {
                displayName: fixDisplayNameFromApple,
              }).then(() => {
                if (user) {
                  const payload = {
                    displayName: fixDisplayNameFromApple ?? '',
                    email: user.email ?? '',
                    photoURL: user.photoURL ?? '',
                  };
                  registerUser(payload, user.uid);

                  store.dispatch(currentUser({ email: user.email, uid: user.uid }));

                  if (user.photoURL) store.dispatch(setAvatar({ avatar: user.photoURL }));

                  checkUser(user.uid);
                }
              });
            } else {
              if (user) {
                const payload = {
                  displayName: fixDisplayNameFromApple ?? '',
                  email: user.email ?? '',
                  photoURL: user.photoURL ?? '',
                };
                registerUser(payload, user.uid);

                store.dispatch(currentUser({ email: user.email, uid: user.uid }));

                if (user.photoURL) store.dispatch(setAvatar({ avatar: user.photoURL }));

                checkUser(user.uid);
              }
            }
          });
        })
        .catch((error) => {
          __DEV__ && console.log('line 138', error);
        });
    } finally {
      setIsLoading(false);
    }
  };

  const checkUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await getUser(userId);
      store.dispatch(userLogin());
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const getDummyImg = async () => {
    const img = await getDownloadURL(ref(storage, 'images/tree_1.webp'));
    setDummyImg(img);
  };

  const registerUser = async (user: { displayName: string; email: string; photoURL: string }, uid: string) => {
    const newUserDoc = {
      name: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      avatar: user.photoURL ?? dummyImg ?? '',
      payments: [],
    } as UserDocument;

    const newFriendDoc = {
      allFriends: [],
      ownRequests: [],
      friendRequests: [],
    } as FriendDocument;

    try {
      const userExists = await checkUserRegistered(uid as string);
      if (userExists) {
        store.dispatch(userLogin());
        return;
      }

      await setDoc(doc(db, 'users', `${uid}`), newUserDoc, { merge: true });
      await setDoc(doc(db, 'friends', `${uid}`), newFriendDoc, { merge: true });
    } catch (e) {
      console.log('line 24 err', e);
    }
  };

  useEffect(() => {
    getDummyImg();
  }, []);

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
        {isLoading && <ActivityIndicator animating={isLoading} />}

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
