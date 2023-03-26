import { createStackNavigator } from '@react-navigation/stack';
import RecordFriend from '@src/screens/Main/RecordFriend';
import PaymentDetails from '@src/screens/Main/RecordFriend/PaymentDetails';
import PaymentPage from '@src/screens/Main/RecordFriend/PaymentPage';
import React from 'react';

const Record = createStackNavigator<Record<string, any>>();

const RecordStack = () => {
  return (
    <Record.Navigator initialRouteName='RecordFriend'>
      <Record.Screen name={'RecordFriend'} component={RecordFriend} options={{ headerShown: false }} />
      <Record.Screen name={'PaymentPage'} component={PaymentPage} options={{ headerShown: false }} />
      <Record.Screen name={'PaymentDetails'} component={PaymentDetails} options={{ headerShown: false }} />
    </Record.Navigator>
  );
};

export default RecordStack;
