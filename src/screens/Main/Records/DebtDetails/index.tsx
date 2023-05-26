import { RouteProp, useFocusEffect } from '@react-navigation/native';
import IcGreenCircleArrow from '@src/assets/svg/IcGreenCircleArrow';
import IcRedCircleArrow from '@src/assets/svg/IcRedCircleArrow';
import PaymentCard from '@src/components/PaymentCard';
import SubPage from '@src/components/SubPage';
import UserCard from '@src/components/UserCard';
import CustomButton from '@src/components/input/CustomButton';
import { DebtDoc } from '@src/types/collection/debtsCollection';
import { Payment } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import { getDebtByIdReturnData, updateStatus } from '@src/utils/collections/debtCollection';
import colours from '@src/utils/colours';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const DebtDetails = ({
  route,
}: // updateStatus,
{
  route: RouteProp<{ params: { debtId: string; isDebtOrReceivable: string; username: string } }>;
  // updateStatus?: ({
  //   type,
  //   status,
  //   debtId,
  //   itemsUsername,
  //   userUsername,
  // }: {
  //   type: string;
  //   status: string;
  //   debtId: string;
  //   itemsUsername?: string;
  //   userUsername?: string;
  // }) => void;
}) => {
  const { username: uname } = useSelector((state: RootState) => state.user);

  const [debtData, setDebtData] = useState<DebtDoc>();
  const [formattedDate, setFormattedDate] = useState<string>('');

  const getData = async () => {
    const { debtId, isDebtOrReceivable, username } = route.params;

    const data = await getDebtByIdReturnData(debtId, username);

    const payload = {
      type: isDebtOrReceivable,
      data: data,
    } as DebtDoc;

    const formattedDate = moment(payload.data.createdAt).format('MMMM DD  - hh:mm A');

    setDebtData(payload);
    setFormattedDate(formattedDate);
  };

  // const handleUpdateStatus = async (status: string) => {
  //   if (debtData?.type === 'Receivable')
  //     updateStatus &&
  //       updateStatus({
  //         type: debtData.type,
  //         status: status,
  //         debtId: route?.params.debtId,
  //         itemsUsername: route?.params.username!!,
  //       });
  //   else
  //     updateStatus &&
  //       updateStatus({ type: debtData?.type!!, status: status, debtId: route?.params.debtId, userUsername: uname!! });
  // };

  const handleAccept = async () => {
    if (debtData?.type === 'Receivable') await updateStatus(route?.params.debtId, route?.params.username!!, 'waiting');
    else await updateStatus(route?.params.debtId, uname!!, 'waiting');
    getData();
  };
  const handleDecline = async () => {
    if (debtData?.type === 'Receivable') await updateStatus(route?.params.debtId, route?.params.username!!, 'declined');
    else await updateStatus(route?.params.debtId, uname!!, 'declined');
    getData();
  };
  const handleConfirm = async () => {
    if (debtData?.type === 'Receivable')
      await updateStatus(route?.params.debtId, route?.params.username!!, 'confirmed');
    else await updateStatus(route?.params.debtId, uname!!, 'confirmed');
    getData();
  };
  const handleConfirmPayment = async () => {
    if (debtData?.type === 'Receivable')
      await updateStatus(route?.params.debtId, route?.params.username!!, 'confirming');
    else await updateStatus(route?.params.debtId, uname!!, 'confirming');
    getData();
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params.debtId) getData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubPage>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
            <Text
              style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
              Details
            </Text>
            <View style={styles.container}>
              <View>{debtData?.type === 'Receivable' ? <IcGreenCircleArrow /> : <IcRedCircleArrow />}</View>
              <View
                style={{
                  marginLeft: 8,
                  paddingVertical: 6,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.detailsText,
                      { color: debtData?.type === 'Receivable' ? colours.greenNormal : colours.redNormal },
                    ]}>
                    {debtData?.type === 'Receivable' ? 'Receivable' : 'Debt'}
                  </Text>
                  <Text style={[styles.detailsText, { color: 'rgba(0, 0, 0, 0.6)' }]}> | {formattedDate}</Text>
                </View>
                <Text style={{ fontFamily: 'dm-500', fontSize: moderateScale(12, 2) }}>
                  {debtData?.type === 'Receivable'
                    ? `Confirm ${debtData?.data.username}’s Payment`
                    : `Payment requested by ${debtData?.data.username}`}
                </Text>
              </View>
            </View>
            {(debtData?.data.status === 'confirming' ||
              debtData?.data.status === 'confirmed' ||
              debtData?.data.status === 'declined') &&
              route.params.isDebtOrReceivable === 'Debt' && (
                <View style={styles.statusDebt}>
                  <Text style={[styles.dmBold, { fontSize: moderateScale(10, 2) }]}>Status:</Text>
                  <Text
                    style={[
                      styles.dmBold,
                      {
                        fontSize: moderateScale(10, 2),
                        marginLeft: 4,
                        color:
                          debtData.data.status === 'confirmed'
                            ? colours.greenNormal
                            : debtData.data.status === 'declined'
                            ? colours.redNormal
                            : '#E18519',
                      },
                    ]}>
                    {debtData.data.status === 'confirmed'
                      ? 'Confirmed'
                      : debtData.data.status === 'declined'
                      ? 'Declined'
                      : 'Pending'}
                  </Text>
                </View>
              )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.dmBold]}>Total Amount:</Text>
              <Text
                style={[
                  styles.dmBold,
                  { marginLeft: 8, color: debtData?.type === 'Debt' ? colours.redNormal : colours.greenNormal },
                ]}>
                {`Rp${parseInt(debtData?.data.totalAmount ?? '0').toLocaleString('id-ID')}`}
              </Text>
            </View>
            {debtData?.data.items && (
              <View style={{ marginTop: 8 }}>
                <Text style={[styles.dmBold, { fontSize: moderateScale(10, 2) }]}>Items :</Text>
                {debtData.data.items.map((item, idx) => {
                  const { itemName, totalPrice } = item;
                  return (
                    <View key={idx.toString()} style={{ flexDirection: 'row', width: '85%', marginTop: 4 }}>
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 5 }]}>
                        {itemName ?? ''}
                      </Text>
                      <Text
                        style={[
                          styles.dmFont,
                          styles.items,
                          { flex: 1, marginLeft: 4 },
                        ]}>{`${item.parts}/${item.fullParts}`}</Text>
                      {/* <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]}>{qty ?? ''}</Text> */}
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 3 }]}>
                        {totalPrice ? `Rp${totalPrice.toLocaleString('id-ID')}` : ''}
                      </Text>
                    </View>
                  );
                })}
                <View style={{ marginTop: 8 }}>
                  {debtData?.data.taxToPay && parseInt(debtData?.data.taxToPay) > 0 && (
                    <View style={{ flexDirection: 'row', width: '85%', marginTop: 4 }}>
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 5 }]}>
                        Tax
                      </Text>
                      <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]} />
                      {/* <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]}>{qty ?? ''}</Text> */}
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 3 }]}>
                        {debtData?.data.taxToPay
                          ? `Rp${parseInt(debtData?.data.taxToPay).toLocaleString('id-ID')}`
                          : ''}
                      </Text>
                    </View>
                  )}
                  {debtData?.data.serviceToPay && parseInt(debtData?.data.serviceToPay) > 0 && (
                    <View style={{ flexDirection: 'row', width: '85%', marginTop: 4 }}>
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 5 }]}>
                        Service
                      </Text>
                      <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]} />
                      {/* <Text style={[styles.dmFont, styles.items, { flex: 1, marginLeft: 4 }]}>{qty ?? ''}</Text> */}
                      <Text numberOfLines={1} style={[styles.dmFont, styles.items, { flex: 3 }]}>
                        {debtData?.data.serviceToPay
                          ? `Rp${parseInt(debtData?.data.serviceToPay).toLocaleString('id-ID')}`
                          : ''}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {debtData?.data.notes && (
              <Text style={[styles.dmBold, { marginTop: 8 }]}>{`Notes : ${debtData.data.notes}`}</Text>
            )}

            <Text style={[styles.dmBold, { fontSize: moderateScale(14, 2), marginTop: 28, marginBottom: 8 }]}>
              Pay To
            </Text>
            {debtData?.data.receipient && <UserCard user={debtData.data.receipient} />}
            {debtData?.data.receipient.payments &&
              debtData?.data.receipient.payments.map((pm: Payment, idx: number) => {
                return <PaymentCard key={idx.toString()} type={pm.bankName} number={pm.number} name={pm.name} />;
              })}

            {route.params.isDebtOrReceivable === 'Debt' && debtData?.data.status === 'requesting' && (
              <View style={styles.actionButtonContainer}>
                <CustomButton
                  text='Accept'
                  style={styles.actionButton}
                  textStyle={styles.actionButtonText}
                  onPress={handleAccept}
                />
                <CustomButton
                  text='Decline'
                  style={[styles.actionButton, { backgroundColor: colours.redNormal }]}
                  textStyle={styles.actionButtonText}
                  onPress={handleDecline}
                />
              </View>
            )}
            {route.params.isDebtOrReceivable === 'Debt' && debtData?.data.status === 'waiting' && (
              <View style={styles.actionButtonContainer}>
                <CustomButton
                  text='Confirm Payment'
                  style={styles.actionButton}
                  textStyle={styles.actionButtonText}
                  onPress={handleConfirmPayment}
                />
              </View>
            )}
            {route.params.isDebtOrReceivable === 'Receivable' && debtData?.data.status === 'confirming' && (
              <View style={styles.actionButtonContainer}>
                <CustomButton
                  text='Verify'
                  style={styles.actionButton}
                  textStyle={styles.actionButtonText}
                  onPress={handleConfirm}
                />
              </View>
            )}
          </View>
        </ScrollView>
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
  container: {
    height: 76,
    width: '100%',
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsText: {
    fontFamily: 'dm',
    fontSize: moderateScale(8, 3),
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
  items: {
    // color: 'rgba(0,0,0,0.6)',
    fontSize: moderateScale(10, 2),
  },
  actionButtonContainer: {
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 12,
    // width: '40%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    marginBottom: 12,
    minWidth: '40%',
  },
  actionButtonText: {
    fontSize: moderateScale(12, 2),
  },
  statusDebt: {
    marginBottom: 12,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: colours.backgroundCustom,
    padding: 4,
    paddingHorizontal: 6,
    marginRight: 'auto',
  },
});

export default DebtDetails;
