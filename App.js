import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import DataPrivacyScreen from './src/screens/dataprivacy';

import ImageDetailsScreen from './src/screens/home/ImageDetailsScreen';

const stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name={'SplashScreen'}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'DataPrivacyScreen'}
            component={DataPrivacyScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'HomeScreen'}
            component={ImageDetailsScreen}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
