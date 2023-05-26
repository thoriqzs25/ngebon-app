import IcDivide from '@src/assets/svg/IcDivide';
import IcRecord from '@src/assets/svg/IcRecord';
import { navigate } from '@src/navigation';
import { RootState } from '@src/types/states/root';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Actions = () => {
  const { username } = useSelector((state: RootState) => state.user);
  const [modalVisible, setShowModal] = useState<boolean>(false);

  const handleClickAction = (type: string) => {
    if (username === null || username === undefined) {
      navigate('UserRegistration');
      return;
    }

    if (type === 'record') {
      navigate('RecordFriend');
    } else if (type === 'divide') {
      navigate('DivideListItem');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
      <View
        style={{
          width: '100%',
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => handleClickAction('record')}>
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
        <Pressable onPress={() => handleClickAction('divide')}>
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
  title: {
    fontSize: 24,
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'inter-500',
  },
  desc: {
    fontFamily: 'inter',
    color: colours.gray300,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Actions;
