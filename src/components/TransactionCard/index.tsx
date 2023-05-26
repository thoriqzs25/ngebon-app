import IcGreenCircleArrow from '@src/assets/svg/IcGreenCircleArrow';
import IcRedCircleArrow from '@src/assets/svg/IcRedCircleArrow';
import colours from '@src/utils/colours';
import { StyleSheet, Text, Easing } from 'react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import TextTicker from 'react-native-text-ticker';
import CustomButton from '../input/CustomButton';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { DebtReceivableType } from '@src/types/collection/debtsCollection';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '@src/navigation';

const TransactionCard = ({
  item,
  updateStatus,
}: {
  item: DebtReceivableType;
  updateStatus?: ({
    type,
    status,
    debtId,
    itemsUsername,
    userUsername,
  }: {
    type: string;
    status: string;
    debtId: string;
    itemsUsername?: string;
    userUsername?: string;
  }) => void;
}) => {
  const { username } = useSelector((state: RootState) => state.user);

  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (item.createdAt) {
      const formattedDate = moment(item.createdAt).format('MMMM DD  - hh:mm A');
      setFormattedDate(formattedDate);
    }
  }, [item.createdAt]);

  const handleUpdateStatus = (status: string) => {
    setIsLoading(true);
    if (item.type === 'Receivable')
      updateStatus &&
        updateStatus({ type: item.type, status: status, debtId: item.debtId, itemsUsername: item.username!! });
    else
      updateStatus && updateStatus({ type: item.type, status: status, debtId: item.debtId, userUsername: username!! });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigate('DebtDetails', {
            debtId: item.debtId,
            isDebtOrReceivable: item.type,
            username: item.type === 'Receivable' ? item.username : username,
          })
        }>
        {item.type === 'Receivable' ? <IcGreenCircleArrow /> : <IcRedCircleArrow />}
      </TouchableOpacity>
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
            style={[
              styles.detailsText,
              { color: item.type === 'Receivable' ? colours.greenNormal : colours.redNormal },
            ]}>
            {item.type === 'Receivable' ? 'Receivable' : 'Debt'}
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
            {item.type === 'Receivable' ? `Verify ${item.username}’s Payment` : `Payment requested by ${item.username}`}
          </TextTicker>
        </View>

        {item.status === 'requesting' && item.type === 'Receivable' && (
          <Text style={[styles.statusText, styles.orange]}>Waiting Confirmation</Text>
        )}
        {item.status === 'waiting' && item.type === 'Receivable' && (
          <Text style={[styles.statusText, styles.orange]}>Waiting Payment</Text>
        )}
        {item.status === 'confirming' && item.type === 'Receivable' && (
          <CustomButton
            text='Verify'
            style={[styles.actionButton]}
            textStyle={{ fontSize: moderateScale(8, 2) }}
            onPress={() => handleUpdateStatus('confirmed')}
            disabled={isLoading}
          />
        )}
        {item.status === 'confirmed' && item.type === 'Receivable' && (
          <Text style={[styles.statusText, styles.gray]}>Confirmed</Text>
        )}
        {item.status === 'declined' && item.type === 'Receivable' && (
          <Text style={[styles.statusText, styles.red]}>Declined</Text>
        )}

        {item.status === 'requesting' && item.type === 'Debt' && (
          <View style={{ flexDirection: 'row' }}>
            <CustomButton
              text='Accept'
              style={[styles.actionButton, { marginRight: 8 }]}
              textStyle={{ fontSize: moderateScale(8, 2) }}
              onPress={() => handleUpdateStatus('waiting')}
              disabled={isLoading}
            />
            <CustomButton
              text='Decline'
              style={[styles.actionButton, { backgroundColor: colours.redNormal }]}
              textStyle={{ fontSize: moderateScale(8, 2) }}
              onPress={() => handleUpdateStatus('declined')}
              disabled={isLoading}
            />
          </View>
        )}
        {item.status === 'waiting' && item.type === 'Debt' && (
          <CustomButton
            text='Confirm Payment'
            style={[styles.actionButton]}
            textStyle={{ fontSize: moderateScale(8, 2) }}
            onPress={() => handleUpdateStatus('confirming')}
            disabled={isLoading}
          />
        )}
        {item.status === 'confirming' && item.type === 'Debt' && (
          <Text style={[styles.statusText, styles.orange]}>Pending Confirmation</Text>
        )}
        {item.status === 'confirmed' && item.type === 'Debt' && (
          <Text style={[styles.statusText, styles.gray]}>Confirmed</Text>
        )}
        {item.status === 'declined' && item.type === 'Debt' && (
          <Text style={[styles.statusText, styles.red]}>Declined</Text>
        )}
      </View>
      <View style={{ marginLeft: 'auto', paddingBottom: 4 }}>
        <Text
          style={{
            color: item.type === 'Receivable' ? colours.greenNormal : colours.redNormal,
            fontFamily: 'dm-500',
            fontSize: moderateScale(12, 2),
          }}>
          Rp
          {parseInt(item.totalAmount)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            .replace(/\.?0+$/, '')}
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
    paddingVertical: 2,
    // width: 80,
    minWidth: 80,
    maxWidth: 120,
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
