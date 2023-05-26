import ImageView from '@src/components/ImageView';
import colours from '@src/utils/colours';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from './HomeHeader';
import { StyleSheet } from 'react-native';
import { globalStyle } from '@src/utils/globalStyles';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import GreenSection from './GreenSection';
import TransactionCard from '@src/components/TransactionCard';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/types/states/root';
import { getUser } from '@src/utils/collections/userCollection';
import useGetAllDebtReceivable from '@src/utils/hooks/useGetAllDebtReceivable';
import { DebtReceivableType } from '@src/types/collection/debtsCollection';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const { auth, user } = useSelector((state: RootState) => state);

  const [userDebts, totalDebts, userReceivables, totalReceivables, isLoading, getData, updateDebtReceivableStatus] =
    useGetAllDebtReceivable(user.username!!);
  const [_sorted, setSorted] = useState<DebtReceivableType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [image, setImage] = useState<string>('tree-1');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (_sorted.length < 1) getData(user.username ?? '');
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user?.name === undefined || user.name === null) {
        getUser(auth.uid as string);
      }
      // if (user.username) {
      //   getData(user.username);
      // }
    }, [])
  );

  useEffect(() => {
    const mixed: DebtReceivableType[] = [...userDebts, ...userReceivables];
    const sorted: DebtReceivableType[] = mixed.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setSorted(sorted);
  }, [userDebts, userReceivables]);

  useEffect(() => {
    const diff = parseInt(totalReceivables) - parseInt(totalDebts);
    if (diff >= 0) setImage('tree-1');
    else if (diff >= -50000) setImage('tree-2');
    else if (diff >= -100000) setImage('tree-3');
    else if (diff >= -250000) setImage('tree-4');
    else if (diff >= -500000) setImage('tree-5');
    else if (diff >= -750000) setImage('tree-6');
    else if (diff < -750000) setImage('tree-7');
  }, [totalDebts, totalReceivables]);

  // useEffect(() => {
  //   if (user.username) getData(user.username);
  // }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingBottom: moderateVerticalScale(160, -1.5) }}
        refreshControl={<RefreshControl refreshing={refreshing || isLoading} onRefresh={onRefresh} enabled={true} />}>
        <HomeHeader />
        <View style={[globalStyle.paddingHorizontal, { paddingTop: 14 }]}>
          <Text style={styles.name}>
            {user?.name !== undefined ? `Hello ${user.name?.split(' ')[0]},` : 'Loading..'}
          </Text>
          <Text style={{ fontFamily: 'dm', fontSize: moderateScale(14, 2) }}>
            Let's log and monitor your transactions!
          </Text>

          <ImageView
            name={image ?? 'tree-1'}
            style={{
              width: moderateScale(120, 2),
              height: moderateScale(120, 2),
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />

          <GreenSection
            totalDebts={totalDebts.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            totalReceivables={totalReceivables.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'dm-500', fontSize: moderateScale(16, 2) }}>Recent</Text>
            {_sorted.length > 0 ? (
              _sorted.map((val, idx) => {
                const { status } = val;
                if (status !== 'confirmed' && status !== 'declined')
                  return <TransactionCard key={idx.toString()} item={val} updateStatus={updateDebtReceivableStatus} />;
              })
            ) : (
              <View
                style={{
                  marginTop: 12,
                  paddingVertical: 20,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  backgroundColor: colours.gray200,
                }}>
                <Text style={{ textAlign: 'center', fontFamily: 'dm', color: colours.gray500 }}>
                  No recent transaction
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: moderateScale(22, 2),
    fontFamily: 'dm-500',
    color: colours.greenNormal,
  },
});

export default Home;
