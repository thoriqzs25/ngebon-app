import { createStackNavigator } from '@react-navigation/stack';
import UserRegistration from '@src/screens/Auth/UserRegistration';
import AuthScreen from '@src/screens/Auth/AuthScreen';

const Auth = createStackNavigator<Record<string, any>>();

const AuthStackNavigator = () => {
  return (
    <Auth.Navigator initialRouteName='AuthScreen'>
      <Auth.Screen name={'AuthScreen'} component={AuthScreen} options={{ headerShown: false }} />
      <Auth.Screen name={'UserRegistration'} component={UserRegistration} options={{ headerShown: false }} />
    </Auth.Navigator>
  );
};

export default AuthStackNavigator;
