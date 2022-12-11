import 'react-native-reanimated';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {io} from 'socket.io-client';
import RNBootSplash from 'react-native-bootsplash';
import {BASE_URL} from '@env';

import {FontsList} from './src/theme/styles';
import HomeScreen from './src/screens/HomeScreen';
import CryptoDetailsScreen from './src/screens/CryptoDetailsScreen';

const Stack = createNativeStackNavigator();

// connecting to socket
export const socket = io(BASE_URL);

socket.on('connect', () => {
  console.log('socket is connected');
});

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <NavigationContainer
        onReady={() => RNBootSplash.hide({fade: true, duration: 500})}>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerTintColor: '#425F57',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FontsList.ManropeMedium,
            },
          }}>
          <Stack.Screen
            options={{headerTitle: 'Market'}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Details" component={CryptoDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
