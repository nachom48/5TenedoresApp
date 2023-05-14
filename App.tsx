import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import initFirebase from './src/utils/firebase';
import 'react-native-get-random-values'

const App = () => {
  useEffect(() => {
    initFirebase();
  }, []);

  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;