import useBoolean from '@src/utils/useBoolean';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImageView from '../ImageView';
import { moderateScale } from 'react-native-size-matters';
import colours from '@src/utils/colours';
import CustomCheckbox from '../input/CustomCheckbox';

const PaymentCard = ({
  type = 'BCA',
  account = '999292123 (Raisa Andriana)',
}: {
  type?: 'BCA' | 'GoPay' | 'OVO' | '';
  account?: string;
}) => {
  const { value: check, setValue: setCheck } = useBoolean(false);

  return (
    <TouchableHighlight
      underlayColor={'rgba(41, 176, 41, 0.05)'}
      onPress={() => setCheck.toggle()}
      style={{ borderColor: 'rgba(41, 176, 41, 0.2)', borderWidth: 1, borderRadius: 12, marginVertical: 6 }}>
      <View
        style={{
          padding: 14,
          flexDirection: 'row',
        }}>
        <ImageView name={type?.toLowerCase()} style={{ width: moderateScale(49, 2), height: moderateScale(35, 2) }} />
        <View style={{ marginLeft: 12, justifyContent: 'center' }}>
          <Text style={[styles.dmFont, { fontSize: moderateScale(13, 2) }]}>{type}</Text>
          <Text style={[styles.dmFont, { fontSize: moderateScale(11, 2), color: colours.gray300 }]}>{account}</Text>
        </View>
        <View
          style={{
            width: 40,
            marginLeft: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomCheckbox value={check} setValue={setCheck} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
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

export default PaymentCard;
