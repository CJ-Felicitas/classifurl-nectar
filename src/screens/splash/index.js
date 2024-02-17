import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';


export default function SplashScreen({navigation}) {

  // 2 seconds for splash screen then proceed to data privacy screen.
  setTimeout(() => {
    navigation.navigate('DataPrivacyScreen');
  }, 2000);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Classifurl</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginTop: 20, // Adjust the spacing between text and button as needed
    backgroundColor: '#007AFF', // You can change the color as per your design
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF', // You can change the text color as per your design
    fontSize: 20,
    fontWeight: 'bold',
  },
});
