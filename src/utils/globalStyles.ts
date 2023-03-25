import { StyleSheet } from 'react-native';

export const ph = 20;
export const pt = 28;

export const globalStyle = StyleSheet.create({
  padding: {
    paddingHorizontal: ph,
    paddingTop: pt,
  },
  paddingModal: {
    paddingHorizontal: ph,
    paddingTop: pt - 12,
  },
  paddingHorizontal: {
    paddingHorizontal: ph,
  },
  paddingTop: {
    paddingTop: pt,
  },
});
