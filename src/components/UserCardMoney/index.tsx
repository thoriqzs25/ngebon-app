import colours from '@src/utils/colours';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ImageView from '../ImageView';
import { UserDocument } from '@src/types/collection/usersCollection';
import { UserReducerState } from '@src/types/states/user';

const UserCardMoney = ({
  onPress,
  user,
  note,
  amount,
}: {
  onPress?: () => void;
  user: UserDocument | UserReducerState;
  note: string;
  amount: string;
}) => {
  return (
    <View style={{ padding: 4, borderRadius: 12, marginBottom: 8 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <ImageView
          name='tree-1'
          remoteAssetFullUri={user !== undefined ? user.avatar : ''}
          style={{
            width: moderateScale(46, 2),
            height: moderateScale(46, 2),
            borderRadius: 100,
            alignSelf: 'center',
          }}
        />
        <View style={{ flexShrink: 1, marginLeft: 24 }}>
          <Text style={[styles.name]} numberOfLines={1}>
            {user ? user.name : 'Loading'}
          </Text>
          <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
            {user ? user.username : ''}
          </Text>
        </View>
        <View style={{ flexShrink: 1, marginLeft: 'auto' }}>
          <Text style={[styles.name, { textAlign: 'right', fontSize: 16 }]} numberOfLines={1}>
            {amount ? `Rp${amount}` : 'Rp0'}
          </Text>
          <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(8, 2), textAlign: 'right' }]}>
            {note ? `Note: ${note}` : ''}
          </Text>
        </View>
      </View>
    </View>
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

export default UserCardMoney;
