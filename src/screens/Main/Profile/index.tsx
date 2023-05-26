import { userLogout } from '@src/redux/actions/auth';
import { removeUser, setAvatar } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from 'firbaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
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
import { navigate } from '@src/navigation';

const Card = ({ children }: { children: JSX.Element }) => {
  return <View style={styles.card}>{children}</View>;
};

const Profile = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const { avatar, username, name, payments } = useSelector((state: RootState) => state.user);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      uploadImage(uri);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          { width: '100%', height: '100%' },
          globalStyle.paddingHorizontal,
          IS_ANDROID && globalStyle.paddingTop,
        ]}>
        <Text style={styles.page}>Profile</Text>
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
              remoteAssetFullUri={avatar}
              style={{
                alignSelf: 'center',
                width: moderateScale(100, 2),
                height: moderateScale(100, 2),
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
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {username !== undefined ? (
          <Text style={styles.username} numberOfLines={1}>
            {username}
          </Text>
        ) : (
          <Text
            style={[
              // styles.dmBold,
              {
                marginTop: 12,
                marginBottom: 8,
                textAlign: 'center',
                paddingHorizontal: 20,
                color: 'rgba(0,0,0,0.5)',
                fontSize: moderateScale(12, 2),
              },
            ]}>
            Please add your username under the "Edit Profile Information" page
          </Text>
        )}
        <Card>
          <View>
            <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('EditProfileInformation')}>
              <View style={styles.action}>
                <MaterialCommunityIcons name='account-edit-outline' size={24} color='black' />
                <Text style={styles.actionText}>Edit Profile Information</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('PaymentDetails')} style={{ marginTop: 4 }}>
              <View style={styles.action}>
                <Ionicons name='card-outline' size={20} />
                <Text style={styles.actionText}>Payment Details</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
        <Card>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              auth.signOut();
              store.dispatch(userLogout());
              store.dispatch(removeUser());
            }}>
            <View style={styles.action}>
              <Ionicons name='log-out-outline' size={20} />
              <Text style={styles.actionText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'dm-700',
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
  dmBold: {
    fontFamily: 'dm-700',
  },
});

export default Profile;
