import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import DataPrivacyScreen from './src/screens/DataPrivacyScreen';
import PasteUrl from './src/screens/PasteUrlScreen';
import ImageDetailsScreen from './src/screens/MenuScreen';
import ImagePreview from './src/screens/ImagePreviewScreen';
import Home from './src/navigator/DrawerNavigator';
import ClassificationResult from './src/screens/ClassificationResultScreen';

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
            component={Home}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'PasteUrl'}
            component={PasteUrl}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'ImagePreview'}
            component={ImagePreview}
            options={{headerShown: false}}
          />
             <stack.Screen
            name={'ClassificationResult'}
            component={ClassificationResult}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
