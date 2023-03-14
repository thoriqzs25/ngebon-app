import AppComponent from '@src/screens';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppComponent />
      </GestureHandlerRootView>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
