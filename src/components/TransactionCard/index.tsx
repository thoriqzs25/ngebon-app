import IcGreenCircleArrow from '@src/assets/svg/IcGreenCircleArrow';
import IcRedCircleArrow from '@src/assets/svg/IcRedCircleArrow';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { StyleSheet, Text, Easing } from 'react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import TextTicker from 'react-native-text-ticker';
import CustomButton from '../input/CustomButton';

const TransactionCard = ({
  name,
  amount,
  type = 'Receivables',
}: {
  name: string;
  amount: string;
  type?: 'Receivables' | 'Debt';
}) => {
  return (
    <View style={styles.container}>
      {type === 'Receivables' ? <IcGreenCircleArrow /> : <IcRedCircleArrow />}
      <View
        style={{
          marginLeft: 8,
          height: '100%',
          paddingVertical: 6,
          justifyContent: 'space-between',
          width: '58%',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[styles.detailsText, { color: type === 'Receivables' ? colours.greenNormal : colours.redNormal }]}>
            {type === 'Receivables' ? 'Receivables' : 'Debt'}
          </Text>
          <Text style={[styles.detailsText, { color: 'rgba(0, 0, 0, 0.6)' }]}>
            {type === 'Receivables' ? ` | March 13 - 02:35 pm` : ` | March 11 - 08:19 pm`}
          </Text>
        </View>
        <View>
          <TextTicker
            style={{ fontFamily: 'dm', fontSize: moderateScale(12, 2) }}
            duration={5000}
            bounce={false}
            easing={Easing.inOut(Easing.linear)}
            // @ts-ignore
            scroll={'toLeft'}
            repeatSpacer={30}>
            {type === 'Receivables' ? `Confirm ${name}’s Payment` : `Payment requested by ${name}`}
          </TextTicker>
        </View>
        {type === 'Receivables' ? (
          <CustomButton text='Confirm' style={[styles.actionButton]} textStyle={{ fontSize: moderateScale(8, 2) }} />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <CustomButton
              text='Accept'
              style={[styles.actionButton, { marginRight: 4 }]}
              textStyle={{ fontSize: moderateScale(8, 2) }}
            />
            <CustomButton
              text='Decline'
              style={[styles.actionButton, { backgroundColor: colours.redNormal }]}
              textStyle={{ fontSize: moderateScale(8, 2) }}
            />
          </View>
        )}
      </View>
      <View style={{ marginLeft: 'auto', paddingBottom: 4 }}>
        <Text
          style={{
            color: type === 'Receivables' ? colours.greenNormal : colours.redNormal,
            fontFamily: 'dm-500',
            fontSize: moderateScale(12, 2),
          }}>
          Rp{parseInt(amount).toLocaleString('id-ID')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 76,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
    // paddingVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    // paddingHorizontal: IS_ANDROID ? 12 : 6,
    borderColor: 'rgba(41, 176, 41, 0.2)',
  },
  detailsText: {
    fontFamily: 'dm',
    fontSize: moderateScale(8, 3),
  },
  actionButton: {
    paddingVertical: 0,
    width: 80,
  },
});

export default TransactionCard;
