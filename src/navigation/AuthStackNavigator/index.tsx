import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@src/screens/Auth/AuthScreen';

const Auth = createStackNavigator<Record<string, any>>();

const AuthStackNavigator = () => {
  return (
    <Auth.Navigator initialRouteName='AuthScreen'>
      <Auth.Screen name={'AuthScreen'} component={AuthScreen} options={{ headerShown: false }} />
    </Auth.Navigator>
  );
};

export default AuthStackNavigator;
