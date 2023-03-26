import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import ImageView from '../ImageView';

const UserCard = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.1)'}
      onPress={() => {
        onPress && onPress();
      }}
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

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-500',
  },
  dmFont: {
    fontFamily: 'dm',
  },
});

export default UserCard;
