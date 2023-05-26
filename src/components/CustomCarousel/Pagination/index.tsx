import colours from '@src/utils/colours';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

const Pagination = ({
  data,
  index,
  paginationClick,
}: {
  data: any;
  index: number;
  paginationClick: (idx: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {data &&
        data.map((_: any, idx: number) => {
          return (
            <Pressable
              key={idx.toString()}
              onPress={() => {
                paginationClick(idx);
              }}>
              <Animated.View
                style={[styles.dot, { backgroundColor: idx === index ? colours.greenNormal : colours.gray300 }]}
              />
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 6,
  },
});

export default Pagination;
