import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Picker from './Picker';

console.disableYellowBox = true;

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Picker />
    </>
  );
};

export default App;
