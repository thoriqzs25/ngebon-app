import { useNavigation } from '@react-navigation/native';
import ImageView from '@src/components/ImageView';
import CustomButton from '@src/components/input/CustomButton';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

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
                return <UserCard key={idx} onPress={() => navigate('PaymentPage')} />;
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
