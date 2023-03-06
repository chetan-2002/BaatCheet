/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeBaseProvider, Text} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import LoginSignupNavigator from './navigation/loginSignupNavigator';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <>
          <LoginSignupNavigator />
        </>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
