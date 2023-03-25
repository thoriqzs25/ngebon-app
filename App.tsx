import AppComponent from '@src/screens';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    dm: require('./src/assets/fonts/DMSans-Regular.ttf'),
    'dm-500': require('./src/assets/fonts/DMSans-Medium.ttf'),
    'dm-700': require('./src/assets/fonts/DMSans-Bold.ttf'),
    pop: require('./src/assets/fonts/Poppins-Regular.ttf'),
    'pop-500': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'pop-700': require('./src/assets/fonts/Poppins-Bold.ttf'),
    roboto: require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-500': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'roboto-700': require('./src/assets/fonts/Roboto-Bold.ttf'),
    inter: require('./src/assets/fonts/Inter-Regular.ttf'),
    'inter-500': require('./src/assets/fonts/Inter-Medium.ttf'),
    'inter-700': require('./src/assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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
