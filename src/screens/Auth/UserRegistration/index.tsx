import CustomCarousel from '@src/components/CustomCarousel';
import CustomButton from '@src/components/input/CustomButton';
import TextField from '@src/components/input/TextField';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserRegistration = () => {
  const [fullname, setFullname] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleNextBtn = async () => {};

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', height: '100%' }}>
      <Text style={[styles.title, { color: colours.greenNormal, marginVertical: 40 }]}>COMPLETE YOUR ACCOUNT</Text>
      <CustomCarousel />
      <View style={{ alignItems: 'center', padding: 24 }}>
        <Text style={[styles.title, { color: colours.greenOld }]}>USER CREDENTIALS</Text>
        <TextField titleAlt={'Full Name'} style={{ marginBottom: 12 }} setValue={() => null} />
        <TextField titleAlt={'Username'} setValue={() => null} />
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
    marginBottom: 40,
  },
  button: { borderRadius: 12, paddingHorizontal: 60, marginTop: 40 },
});

export default UserRegistration;
