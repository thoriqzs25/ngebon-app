import IcDivide from '@src/assets/svg/IcDivide';
import IcRecord from '@src/assets/svg/IcRecord';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Actions = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
      <View
        style={{
          width: '100%',
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => navigate('RecordFriend')}>
          <TouchableOpacity activeOpacity={0.75}>
            <IcRecord size={200} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Record</Text>
            <Text style={styles.desc}>Log your debt and receivables</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', width: '100%', marginTop: 40 }}>
        <Pressable onPress={() => navigate('DivideListItem')}>
          <TouchableOpacity activeOpacity={0.75}>
            <IcDivide size={200} />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>Divide</Text>
            <Text style={styles.desc}>Automatically share expenses</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: { fontFamily: 'inter-500', fontSize: 24, textAlign: 'center', marginTop: 12 },
  desc: { fontFamily: 'inter', color: colours.gray300 },
});

export default Actions;
