import { createStackNavigator } from '@react-navigation/stack';
import PaymentPage from '@src/screens/Main/Actions/PaymentPage';
import TabNavigator from './TabNavigator';
import Actions from '@src/screens/Main/Actions';
import DivideListItem from '@src/screens/Main/Actions/DivideListItem';
import DivideChooseFriends from '@src/screens/Main/Actions/DivideChooseFriends';
import RecordFriend from '@src/screens/Main/Actions/RecordFriend';
import PaymentDetails from '@src/screens/Main/Actions/PaymentDetails';
import DivideAssign from '@src/screens/Main/Actions/DivideAssign';

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
      <Main.Screen name={'PaymentPage'} component={PaymentPage} options={{ headerShown: false }} />
      <Main.Screen name={'PaymentDetails'} component={PaymentDetails} options={{ headerShown: false }} />

      {/*  */}
    </Main.Navigator>
  );
};

export default MainStackNavigator;
