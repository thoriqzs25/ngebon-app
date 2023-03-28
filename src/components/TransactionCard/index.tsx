import IcGreenCircleArrow from '@src/assets/svg/IcGreenCircleArrow';
import IcRedCircleArrow from '@src/assets/svg/IcRedCircleArrow';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { StyleSheet, Text, Easing } from 'react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import TextTicker from 'react-native-text-ticker';
import CustomButton from '../Input/CustomButton';

const TransactionCard = ({ type = 'Incoming' }: { type?: 'Incoming' | 'Outcoming' }) => {
  return (
    <View style={styles.container}>
      {type === 'Incoming' ? <IcGreenCircleArrow /> : <IcRedCircleArrow />}
      <View
        style={{
          marginLeft: 8,
          height: '100%',
          justifyContent: 'center',
          gap: 4,

          width: '58%',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.detailsText, { color: type === 'Incoming' ? colours.greenNormal : colours.redNormal }]}>
            {type === 'Incoming' ? 'Receivables' : 'Debt'}
          </Text>
          <Text style={[styles.detailsText, { color: 'rgba(0, 0, 0, 0.6)' }]}>
            {type === 'Incoming' ? ` | March 13 - 02:35 pm` : ` | March 11 - 08:19 pm`}
          </Text>
        </View>
        <View style={{}}>
          <TextTicker
            style={{ fontFamily: 'dm', fontSize: moderateScale(12, 2) }}
            duration={5000}
            bounce={false}
            easing={Easing.inOut(Easing.linear)}
            // @ts-ignore
            scroll={'toLeft'}
            repeatSpacer={30}>
            {type === 'Incoming' ? 'Confirm Hamish’s Payment' : 'Payment requested by Zalina Arga'}
          </TextTicker>
        </View>
        {type === 'Incoming' ? (
          <CustomButton
            text='Confirm'
            style={{ paddingVertical: 2, width: 80 }}
            textStyle={{ fontSize: moderateScale(8, 2) }}
          />
        ) : (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <CustomButton
              text='Accept'
              style={{ paddingVertical: 2, width: 80 }}
              textStyle={{ fontSize: moderateScale(8, 2) }}
            />
            <CustomButton
              text='Decline'
              style={{ paddingVertical: 2, width: 80, backgroundColor: colours.redNormal }}
              textStyle={{ fontSize: moderateScale(8, 2) }}
            />
          </View>
        )}
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Text
          style={{
            color: type === 'Incoming' ? colours.greenNormal : colours.redNormal,
            fontFamily: 'dm-500',
            fontSize: moderateScale(12, 2),
          }}>
          {type === 'Incoming' ? 'Rp253.000' : 'Rp160.000'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 84,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 4,
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
});

export default TransactionCard;
