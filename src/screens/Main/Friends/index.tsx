import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Friends = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomButton
        text='Add Friend'
        style={{ paddingHorizontal: 20, borderRadius: 8 }}
        onPress={() => navigate('AddFriend')}
      />
    </SafeAreaView>
  );
};

export default Friends;
