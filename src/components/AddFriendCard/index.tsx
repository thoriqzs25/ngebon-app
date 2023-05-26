import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';

const AddFriendCard = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.1)'}
      onPress={onPress}
      style={{ padding: 4, borderRadius: 12, marginBottom: 8 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#CFCFD0',
            width: moderateScale(46, 2),
            height: moderateScale(46, 2),
            borderRadius: 100,
          }}>
          <Ionicons size={24} name={'person-add-outline'} />
        </View>
        <View style={{ flexShrink: 1, marginLeft: 24 }}>
          <Text style={[styles.name]} numberOfLines={1}>
            Add Friend
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  name: {
    fontFamily: 'dm-500',
  },
  dmFont: {
    fontFamily: 'dm',
  },
});
export default AddFriendCard;
