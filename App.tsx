import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor="#36393f"
          barStyle="light-content"
          translucent={true}
        />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
