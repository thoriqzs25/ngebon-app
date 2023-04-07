import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import colours from '@src/utils/colours';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserRegistration = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', height: '100%', padding: 24 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.title, { color: colours.greenNormal, marginTop: 40 }]}>COMPLETE YOUR ACCOUNT</Text>
        <Text style={[styles.title, { color: colours.greenOld }]}>FULL NAME</Text>
        <TextField setValue={() => null} />
        <CustomButton text='Next' style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'dm-500',
  },
  button: { borderRadius: 12, paddingHorizontal: 60, marginTop: 40 },
});

export default UserRegistration;
