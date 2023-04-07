import CustomButton from '@src/components/input/CustomButton';
import { userLogout } from '@src/redux/actions/auth';
import { store } from '@src/redux/store';
import colours from '@src/utils/colours';
import { View } from 'react-native';

const Profile = () => {
  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <CustomButton
        text='Logout'
        style={{ paddingHorizontal: 28, backgroundColor: colours.redNormal }}
        onPress={() => store.dispatch(userLogout())}
      />
    </View>
  );
};

export default Profile;
