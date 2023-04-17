import GreenCard from '@src/assets/svg/GreenCard';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const GreenSection = ({ totalDebts, totalReceivables }: { totalDebts: string; totalReceivables: string }) => {
  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <GreenCard />
      <View
        style={{
          width: 327,
          height: 142,
          position: 'absolute',
          alignItems: 'center',
          flexDirection: 'row',
          // paddingHorizontal: 8,
          justifyContent: 'space-evenly',
        }}>
        <View style={[styles.text_container]}>
          <Text style={[styles.white_text, styles.text_1]}>Debts</Text>
          <Text style={[styles.white_text, styles.text_2]}>Amount you owe</Text>
          <Text style={[styles.white_text, styles.text_3]} numberOfLines={1}>
            Rp{totalDebts}
          </Text>
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('Records', { tab: 'Debts' })}>
            <View style={styles.view_all_box}>
              <Text style={[styles.white_text, styles.text_4]}>View All</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.text_container]}>
          <Text style={[styles.white_text, styles.text_1]}>Receivables</Text>
          <Text style={[styles.white_text, styles.text_2]}>Amount owed to you</Text>
          <Text style={[styles.white_text, styles.text_3]} numberOfLines={1}>
            Rp{totalReceivables}
          </Text>
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('Records', { tab: 'Receivables' })}>
            <View style={styles.view_all_box}>
              <Text style={[styles.white_text, styles.text_4]}>View All</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text_container: {
    alignItems: 'center',
    width: '47%',
  },
  white_text: {
    color: colours.white,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colours.white,
  },
  view_all_box: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 8,
  },
  text_1: { fontFamily: 'pop' },
  text_2: { fontFamily: 'pop', fontSize: moderateScale(8, 2), lineHeight: 12 },
  text_3: { fontFamily: 'inter-500', fontSize: moderateScale(16, 2), lineHeight: 28, letterSpacing: 1 },
  text_4: { fontFamily: 'roboto-500' },
});

export default GreenSection;
