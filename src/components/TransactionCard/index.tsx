import IcGreenCircleArrow from '@src/assets/svg/IcGreenCircleArrow';
import IcRedCircleArrow from '@src/assets/svg/IcRedCircleArrow';
import colours from '@src/utils/colours';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { StyleSheet, Text, Easing } from 'react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import TextTicker from 'react-native-text-ticker';
import CustomButton from '../input/CustomButton';
import { useEffect, useState } from 'react';
import moment from 'moment';

const TransactionCard = ({
  name,
  amount,
  type = 'Receivable',
  date,
  status,
}: // status = 'requesting',
{
  name: string;
  amount: string;
  type?: 'Receivable' | 'Debt' | string;
  date: Date;
  status: string;
}) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (date) {
      const formattedDate = moment(date).format('MMMM DD  - hh:mm A');
      setFormattedDate(formattedDate);
    }
  }, [date]);

  const handleAccept = async () => {};
  const handleDecline = async () => {};
  const handleConfirm = async () => {};
  const handleConfirmPayment = async () => {};

  return (
    <View style={styles.container}>
      {type === 'Receivable' ? <IcGreenCircleArrow /> : <IcRedCircleArrow />}
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
            style={[styles.detailsText, { color: type === 'Receivable' ? colours.greenNormal : colours.redNormal }]}>
            {type === 'Receivable' ? 'Receivable' : 'Debt'}
          </Text>
          <Text style={[styles.detailsText, { color: 'rgba(0, 0, 0, 0.6)' }]}> | {formattedDate}</Text>
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
            {type === 'Receivable' ? `Confirm ${name}’s Payment` : `Payment requested by ${name}`}
          </TextTicker>
        </View>

        {status === 'requesting' && type === 'Receivable' && (
          <Text style={[styles.statusText, styles.orange]}>Waiting Confirmation</Text>
        )}
        {status === 'waiting' && type === 'Receivable' && (
          <Text style={[styles.statusText, styles.orange]}>Waiting Payment</Text>
        )}
        {status === 'confirming' && type === 'Receivable' && (
          <CustomButton text='Confirm' style={[styles.actionButton]} textStyle={{ fontSize: moderateScale(8, 2) }} />
        )}
        {status === 'confirmed' && type === 'Receivable' && (
          <Text style={[styles.statusText, styles.red]}>Declined</Text>
        )}
        {status === 'declined' && type === 'Receivable' && (
          <Text style={[styles.statusText, styles.gray]}>Confirmed</Text>
        )}

        {status === 'requesting' && type === 'Debt' && (
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
        {status === 'waiting' && type === 'Debt' && (
          <CustomButton
            text='Confirm Payment'
            style={[styles.actionButton]}
            textStyle={{ fontSize: moderateScale(8, 2) }}
          />
        )}
        {status === 'confirming' && type === 'Debt' && (
          <Text style={[styles.statusText, styles.orange]}>Pending Confirmation</Text>
        )}
        {status === 'confirmed' && type === 'Debt' && <Text style={[styles.statusText, styles.gray]}>Confirmed</Text>}
        {status === 'declined' && type === 'Debt' && <Text style={[styles.statusText, styles.gray]}>Confirmed</Text>}
      </View>
      <View style={{ marginLeft: 'auto', paddingBottom: 4 }}>
        <Text
          style={{
            color: type === 'Receivable' ? colours.greenNormal : colours.redNormal,
            fontFamily: 'dm-500',
            fontSize: moderateScale(12, 2),
          }}>
          Rp{amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
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
  statusText: {
    fontFamily: 'dm',
    fontSize: moderateScale(8, 3),
  },
  orange: {
    color: '#E18519',
  },
  gray: {
    color: 'rgba(0,0,0,0.6)',
  },
  red: {
    color: colours.redNormal,
  },
});

export default TransactionCard;
