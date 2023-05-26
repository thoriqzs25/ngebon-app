import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import colours from '@utils/colours';
import { DEVICE_OS, SCREEN_WIDTH } from '@utils/deviceDimensions';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '@src/screens/Main/Home';
import Profile from '@src/screens/Main/Profile';
import Actions from '@src/screens/Main/Actions';
import Friends from '@src/screens/Main/Friends';
import Records from '@src/screens/Main/Records';

const Tab = createBottomTabNavigator<any>();

const TabNavigator = () => {
  const getTabBarVisibility = (route: RouteProp<any>) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    const hideOnScreens = ['DivideChooseFriends'];
    // return;
    if (hideOnScreens.indexOf(routeName) <= -1) return 'flex';
    return 'none';
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          left: -1,
          height: 80,
          paddingTop: 4,
          borderWidth: 1,
          shadowRadius: 0,
          paddingBottom: 20,
          borderTopWidth: 1,
          position: 'absolute',
          borderTopLeftRadius: 12,
          width: SCREEN_WIDTH + 2,
          borderTopRightRadius: 12,
          borderColor: 'rgba(41, 176, 41, 0.4)',
          borderTopColor: 'rgba(41, 176, 41, 0.4)',
        },
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            // tabBarStyle: { display: getTabBarVisibility(route) },
            headerShown: false,
            tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
              <Text style={{ color: focused ? colours.greenNormal : colours.black }}>Home</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons name='md-home' size={24} color={focused ? colours.greenNormal : colours.black} />
            ),
          };
        }}
      />
      <Tab.Screen
        name='Records'
        component={Records}
        // component={ChatStackNavigator}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            // tabBarStyle: { display: getTabBarVisibility(route) },
            // tabBarItemStyle:  { backgroundColor: colours.blueNormal, borderRadius: 16, },
            headerShown: false,
            tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
              <Text style={{ color: focused ? colours.greenNormal : colours.black }}>Records</Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons name='receipt' size={24} color={focused ? colours.greenNormal : colours.black} />
            ),
          };
        }}
      />
      <Tab.Screen
        name='Actions'
        component={Actions}
        // component={ProfileStackNavigator}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            // tabBarShowLabel: false,
            // tabBarStyle: { display: getTabBarVisibility(route) },
            headerShown: false,
            tabBarLabel: ({ focused }: { focused: boolean }) => <Text></Text>,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TouchableOpacity activeOpacity={0.75}>
                <View
                  style={{
                    // top: -20,
                    width: 72,
                    height: 72,
                    borderRadius: 50,

                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: DEVICE_OS === 'ios' ? 4 : 0,
                    backgroundColor: colours.greenNormal,
                  }}>
                  <Ionicons size={44} name='add-outline' color={colours.white} />
                </View>
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Tab.Screen
        name='Friends'
        component={Friends}
        // component={ProfileStackNavigator}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            // tabBarStyle: { display: getTabBarVisibility(route) },
            headerShown: false,
            tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
              <Text style={{ color: focused ? colours.greenNormal : colours.black }}>Friends</Text>
            ),
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <Ionicons name='book' size={24} color={focused ? colours.greenNormal : colours.black} />
            ),
          };
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        // component={ProfileStackNavigator}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            // tabBarStyle: { display: getTabBarVisibility(route) },
            headerShown: false,
            tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
              <Text style={{ color: focused ? colours.greenNormal : colours.black }}>Profile</Text>
            ),
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <Ionicons name='person' size={24} color={focused ? colours.greenNormal : colours.black} />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 73,
    alignItems: 'center',
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 2,
    // fontFamily: fontFamily.bold,
  },
});

export default TabNavigator;
