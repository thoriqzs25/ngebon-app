import { useNavigation } from '@react-navigation/native';
import ImageView from '@src/components/ImageView';
import CustomButton from '@src/components/Input/CustomButton';
import SubPage from '@src/components/SubPage';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

const UserCard = () => {
  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.1)'}
      onPress={() => navigate('PaymentPage')}
      style={{ padding: 4, borderRadius: 12, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ImageView
          name='tree-1'
          style={{
            width: moderateScale(46, 2),
            height: moderateScale(46, 2),
            alignSelf: 'center',
          }}
        />
        <View style={{ marginLeft: 24 }}>
          <Text style={[styles.dmFont]}>Raisa Andriana</Text>
          <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>raisa6690</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const RecordFriend = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1 }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose a Person</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard />
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8 }]}>Friends</Text>
            {Array(9)
              .fill(0)
              .map((_, idx) => {
                return <UserCard key={idx} />;
              })}
          </ScrollView>
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-500',
  },
  dmFont: {
    fontFamily: 'dm',
  },
});

export default RecordFriend;
