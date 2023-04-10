import { useNavigation } from '@react-navigation/native';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const DivideChooseFriends = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleCheck = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, index]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== index));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(50, -1.5) }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Record
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Choose Friends</Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8, marginTop: 4 }]}>You</Text>
            <UserCard
              onPress={() => null}
              withCheckBox={true}
              onCheckChanged={(isChecked: boolean) => handleCheck(90, isChecked)}
            />
            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginBottom: 8 }]}>Friends</Text>
            {Array(9)
              .fill(0)
              .map((_, idx) => {
                return (
                  <UserCard
                    key={idx}
                    onPress={() => null}
                    withCheckBox={true}
                    onCheckChanged={(isChecked: boolean) => handleCheck(idx + 1, isChecked)}
                  />
                );
              })}
          </ScrollView>
          <CustomButton
            text='Next'
            style={{ borderRadius: 10, width: '50%', alignSelf: 'center', marginTop: 20 }}
            onPress={() => navigate('DivideAssign')}
          />
        </View>
      </SubPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
});

export default DivideChooseFriends;
