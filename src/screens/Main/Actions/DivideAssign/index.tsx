import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import colours from '@src/utils/colours';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const DivideAssign = () => {
  const [currIdx, setCurrIdx] = useState<number>(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <View style={{ flex: 1, paddingBottom: moderateVerticalScale(50, -1.5) }}>
          <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
            Divide
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>Assign</Text>
          <View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 12 }}>
              {Array(6)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <TouchableOpacity activeOpacity={0.85} onPress={() => setCurrIdx(idx)}>
                      <ImageView
                        key={idx.toString()}
                        name={'tree-1'}
                        // style={[styles.userAvatar, { border: `2px solid #29B029` }]}
                        style={[
                          styles.userAvatar,
                          { borderWidth: idx === currIdx ? 2 : 0, borderColor: colours.greenNormal },
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>

          {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>

          </ScrollView> */}
          <CustomButton text='Next' style={{ borderRadius: 10, width: '50%', alignSelf: 'center', marginTop: 20 }} />
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
  userAvatar: {
    width: moderateScale(46, 2),
    height: moderateScale(46, 2),
    borderRadius: 100,
    marginHorizontal: 4,
  },
});

export default DivideAssign;
