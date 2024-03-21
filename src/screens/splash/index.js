import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';


export default function SplashScreen({navigation}) {

  // 2 seconds for splash screen then proceed to data privacy screen.
  setTimeout(() => {
    navigation.navigate('DataPrivacyScreen');
  }, 2000);

  return (
    <View style={styles.container}>
      <Image resizeMode='center' source={require('../../assets/applogo.png')} />
      {/* <Text style={styles.welcomeMessage}>ClassifURL</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0A7DA'
  },
  welcomeMessage: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginTop: 20, 
    backgroundColor: '#007AFF', 
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 20,
    fontWeight: 'bold',
  },
});
