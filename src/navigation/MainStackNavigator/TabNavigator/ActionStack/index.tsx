import { createStackNavigator } from '@react-navigation/stack';
import Actions from '@src/screens/Main/Actions';
import DivideListItem from '@src/screens/Main/Actions/DivideListItem';
import RecordFriend from '@src/screens/Main/Actions/RecordFriend';
import PaymentDetails from '@src/screens/Main/Actions/RecordFriend/PaymentDetails';
import PaymentPage from '@src/screens/Main/Actions/RecordFriend/PaymentPage';
import React from 'react';

const Action = createStackNavigator<Record<string, any>>();

const ActionStack = () => {
  return (
    <Action.Navigator initialRouteName='Actions'>
      <Action.Screen name={'Actions'} component={Actions} options={{ headerShown: false }} />
      <Action.Screen name={'DivideListItem'} component={DivideListItem} options={{ headerShown: false }} />
      <Action.Screen name={'RecordFriend'} component={RecordFriend} options={{ headerShown: false }} />
      <Action.Screen name={'PaymentPage'} component={PaymentPage} options={{ headerShown: false }} />
      <Action.Screen name={'PaymentDetails'} component={PaymentDetails} options={{ headerShown: false }} />
    </Action.Navigator>
  );
};

export default ActionStack;
