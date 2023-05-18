import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Actions from '@src/screens/Main/Actions';
import DivideListItem from '@src/screens/Main/Actions/DivideListItem';
import DivideChooseFriends from '@src/screens/Main/Actions/DivideChooseFriends';
import RecordFriend from '@src/screens/Main/Actions/RecordFriend';
import DivideAssign from '@src/screens/Main/Actions/DivideAssign';
import AddFriend from '@src/screens/Main/Friends/AddFriend';
import PaymentReceipient from '@src/screens/Main/Actions/PaymentReceipient';
import EditProfileInformation from '@src/screens/Main/Profile/EditProfileInformation';
import PaymentDetails from '@src/screens/Main/Profile/PaymentDetails';
import AddPaymentDetails from '@src/screens/Main/Profile/PaymentDetails/AddPaymentDetails';
import RecordPaymentAmount from '@src/screens/Main/Actions/RecordPaymentAmount';
import ActionsPaymentDetails from '@src/screens/Main/Actions/ActionsPaymentDetails';
import ActionsConfirmation from '@src/screens/Main/Actions/ActionsConfirmation';
import DebtDetails from '@src/screens/Main/Records/DebtDetails';
import EditPaymentDetails from '@src/screens/Main/Profile/PaymentDetails/EditPaymentDetails';
import UserRegistration from '@src/screens/Auth/UserRegistration';

const Main = createStackNavigator<Record<string, any>>();

const MainStackNavigator = () => {
  return (
    <Main.Navigator initialRouteName='TabNavigator'>
      <Main.Screen name={'TabNavigator'} component={TabNavigator} options={{ headerShown: false }} />

      {/* Records */}
      <Main.Screen name={'DebtDetails'} component={DebtDetails} options={{ headerShown: false }} />

      {/* Record/Divide */}
      <Main.Screen name={'Actions'} component={Actions} options={{ headerShown: false }} />
      <Main.Screen name={'DivideListItem'} component={DivideListItem} options={{ headerShown: false }} />
      <Main.Screen name={'DivideChooseFriends'} component={DivideChooseFriends} options={{ headerShown: false }} />
      <Main.Screen name={'DivideAssign'} component={DivideAssign} options={{ headerShown: false }} />
      <Main.Screen name={'RecordFriend'} component={RecordFriend} options={{ headerShown: false }} />
      <Main.Screen name={'RecordPaymentAmount'} component={RecordPaymentAmount} options={{ headerShown: false }} />
      <Main.Screen name={'ActionsPaymentDetails'} component={ActionsPaymentDetails} options={{ headerShown: false }} />
      <Main.Screen name={'ActionsConfirmation'} component={ActionsConfirmation} options={{ headerShown: false }} />
      <Main.Screen name={'PaymentReceipient'} component={PaymentReceipient} options={{ headerShown: false }} />

      {/* Friends */}
      <Main.Screen name={'AddFriend'} component={AddFriend} options={{ headerShown: false }} />

      {/* Profile */}
      <Main.Screen
        name={'EditProfileInformation'}
        component={EditProfileInformation}
        options={{ headerShown: false }}
      />
      <Main.Screen name={'PaymentDetails'} component={PaymentDetails} options={{ headerShown: false }} />
      <Main.Screen name={'AddPaymentDetails'} component={AddPaymentDetails} options={{ headerShown: false }} />
      <Main.Screen name={'EditPaymentDetails'} component={EditPaymentDetails} options={{ headerShown: false }} />

      {/* Username Regis */}
      <Main.Screen name={'UserRegistration'} component={UserRegistration} options={{ headerShown: false }} />
    </Main.Navigator>
  );
};

export default MainStackNavigator;
