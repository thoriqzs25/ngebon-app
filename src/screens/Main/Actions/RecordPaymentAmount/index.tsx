import { TextInput, View } from 'react-native';
import ImageView from '@src/components/ImageView';
import SubPage from '@src/components/SubPage';
import colours from '@src/utils/colours';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useCallback, useEffect, useState } from 'react';
import CustomButton from '@src/components/input/CustomButton';
import { navigate } from '@src/navigation';
import { RouteProp } from '@react-navigation/native';
import { UserDocument } from '@src/types/collection/usersCollection';
import { ItemRecord } from '@src/types/states/record';
import { store } from '@src/redux/store';
import { setRecords } from '@src/redux/actions/record';

const PaymentCard = ({
  user,
  value,
  setValue,
  note,
  setNote,
}: {
  user: UserDocument;
  value: string;
  setValue: (text: string) => void;
  note: string;
  setNote: (text: string) => void;
}) => {
  const convertAmount = (rp: string) => {
    if (rp.length === 0) return setValue('');

    const cleared = rp.replace(/\./g, '');

    const num = parseInt(cleared).toLocaleString('id-ID');

    if (num) setValue(num);
  };

  return (
    <View
      style={{
        padding: 20,
        width: '96%',
        marginTop: 2,
        elevation: 6,
        borderRadius: 20,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        marginBottom: 12,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.white,
      }}>
      <ImageView
        name='tree-1'
        remoteAssetFullUri={user ? user.avatar : ''}
        style={{
          width: moderateScale(52, 2),
          height: moderateScale(52, 2),
          borderRadius: moderateScale(23, 2),
          alignSelf: 'center',
        }}
      />
      <Text style={[styles.name, { marginVertical: 4 }]}>{user ? user.name : ''}</Text>
      <Text style={[styles.dmFont, { color: colours.gray300, fontSize: moderateScale(10, 2) }]}>
        {user ? user.username : ''}
      </Text>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          marginVertical: 16,
        }}>
        <Text style={{ fontFamily: 'inter-500', fontSize: moderateScale(36, 2) }}>Rp</Text>

        <TextInput
          onChangeText={(e) => {
            convertAmount(e);
          }}
          value={value}
          maxLength={9}
          placeholder='0'
          keyboardType='number-pad'
          textBreakStrategy='simple'
          style={{
            width: '100%',
            marginLeft: 12,
            fontFamily: 'dm',
            fontSize: moderateScale(34, 2),
          }}
          placeholderTextColor={colours.gray300}
        />
      </View>
      <TextInput
        style={{
          fontFamily: 'inter',
          fontSize: moderateScale(10, 2),
          color: colours.gray500,
          textAlign: 'center',
          width: '100%',
        }}
        value={note}
        onChangeText={(text: string) => setNote(text)}
        placeholderTextColor={colours.gray300}
        placeholder={'add note (optional)'}
        maxLength={32}
      />
    </View>
  );
};

const RecordPaymentAmount = ({ route }: { route: RouteProp<{ params: { prevInputs: ItemRecord[] } }> }) => {
  // const [recordList, setRecordList] = useState<UserDocument[]>([]);
  const [inputs, setInputs] = useState<ItemRecord[]>([]);

  useEffect(() => {
    if (route.params.prevInputs) {
      const newArr: ItemRecord[] = [];

      route.params.prevInputs.map((input, idx) => {
        newArr.push({ user: input.user, amount: input.amount ?? '', note: input.note ?? '' });
      });

      setInputs(newArr);
      // setRecordList(route.params.recordFriends);
    }
  }, []);

  const handleNext = () => {
    store.dispatch(setRecords({ records: [...inputs] }));
    navigate('PaymentReceipient', { page: 'Record' });
  };

  const handleAmountChange = useCallback(
    (text: string, index: number) => {
      const newInputs = [...inputs];
      newInputs[index].amount = text;
      setInputs(newInputs);
    },
    [inputs]
  );

  const handleNoteChange = useCallback(
    (text: string, index: number) => {
      const newInputs = [...inputs];
      newInputs[index].note = text;
      setInputs(newInputs);
    },
    [inputs]
  );

  const handleAddAnother = () => {
    navigate('RecordFriend', { prevInputs: inputs }, true);
  };

  const handleBack = () => {
    navigate('RecordFriend', { prevInputs: [] });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage customGoBack={handleBack} title={'cancel'}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={[
              styles.dmBold,
              { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12, width: '100%' },
            ]}>
            Record (2/5)
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8, width: '100%' }]}>
            Enter Payment Amount
          </Text>
          <Text style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Enter payment amount for each user
          </Text>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: moderateVerticalScale(140, -1.5),
              // gap: 20
            }}
            showsVerticalScrollIndicator={true}>
            {inputs.map((record, idx) => {
              return (
                <PaymentCard
                  key={idx}
                  user={record.user}
                  value={inputs[idx].amount}
                  note={inputs[idx].note}
                  setNote={(text: string) => handleNoteChange(text, idx)}
                  setValue={(text: string) => handleAmountChange(text, idx)}
                />
              );
            })}
            <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'space-between' }}>
              <CustomButton
                style={[styles.button, { backgroundColor: colours.grayNormal }]}
                text='Add another friend'
                textStyle={styles.buttonText}
                onPress={handleAddAnother}
              />
              <CustomButton style={[styles.button]} text='Next' textStyle={styles.buttonText} onPress={handleNext} />
            </View>
          </ScrollView>
        </View>
      </SubPage>
    </SafeAreaView>
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
  button: {
    width: 160,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'dm',
    fontSize: moderateScale(11, 2),
  },
});

export default RecordPaymentAmount;
