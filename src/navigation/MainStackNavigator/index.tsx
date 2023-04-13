import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Actions from '@src/screens/Main/Actions';
import DivideListItem from '@src/screens/Main/Actions/DivideListItem';
import DivideChooseFriends from '@src/screens/Main/Actions/DivideChooseFriends';
import RecordFriend from '@src/screens/Main/Actions/RecordFriend';
import RecordPaymentDetails from '@src/screens/Main/Actions/RecordPaymentDetails';
import DivideAssign from '@src/screens/Main/Actions/DivideAssign';
import AddFriend from '@src/screens/Main/Friends/AddFriend';
import PaymentReceipient from '@src/screens/Main/Actions/PaymentReceipient';
import EditProfileInformation from '@src/screens/Main/Profile/EditProfileInformation';
import RecordPaymentPage from '@src/screens/Main/Actions/RecordPaymentPage';

const Main = createStackNavigator<Record<string, any>>();

const MainStackNavigator = () => {
  return (
    <Main.Navigator initialRouteName='TabNavigator'>
      <Main.Screen name={'TabNavigator'} component={TabNavigator} options={{ headerShown: false }} />

      {/* Record/Divide */}
      <Main.Screen name={'Actions'} component={Actions} options={{ headerShown: false }} />
      <Main.Screen name={'DivideListItem'} component={DivideListItem} options={{ headerShown: false }} />
      <Main.Screen name={'DivideChooseFriends'} component={DivideChooseFriends} options={{ headerShown: false }} />
      <Main.Screen name={'DivideAssign'} component={DivideAssign} options={{ headerShown: false }} />
      <Main.Screen name={'RecordFriend'} component={RecordFriend} options={{ headerShown: false }} />
      <Main.Screen name={'RecordPaymentPage'} component={RecordPaymentPage} options={{ headerShown: false }} />
      <Main.Screen name={'RecordPaymentDetails'} component={RecordPaymentDetails} options={{ headerShown: false }} />
      <Main.Screen name={'PaymentReceipient'} component={PaymentReceipient} options={{ headerShown: false }} />

      {/* Friends */}
      <Main.Screen name={'AddFriend'} component={AddFriend} options={{ headerShown: false }} />

      {/* Profile */}
      <Main.Screen
        name={'EditProfileInformation'}
        component={EditProfileInformation}
        options={{ headerShown: false }}
      />
    </Main.Navigator>
  );
};

export default MainStackNavigator;
