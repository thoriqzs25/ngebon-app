import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@src/navigation';
import SwitchStackNavigator from '@src/navigation/SwitchStackNavigator';
import colours from '@src/utils/colours';
import { StatusBar, View } from 'react-native';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colours.white,
    card: colours.white,
    background: colours.white,
  },
};

const AppComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={appTheme} ref={navigationRef}>
        <StatusBar barStyle={'light-content'} backgroundColor={colours.backgroundPrimary} />
        {/* <CustomSnackBar visible={message !== null && message !== ''} desc={message ?? ''} /> */}
        {/* <CodepushCheck /> */}

        <SwitchStackNavigator />
      </NavigationContainer>
    </View>
  );
};

export default AppComponent;
