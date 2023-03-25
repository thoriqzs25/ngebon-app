import CustomButton from '@src/components/Input/CustomButton';
import colours from '@src/utils/colours';
import { View } from 'react-native';

const Profile = () => {
  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <CustomButton text='Logout' style={{ paddingHorizontal: 28, backgroundColor: colours.redNormal }} />
    </View>
  );
};

export default Profile;
