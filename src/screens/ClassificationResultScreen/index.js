import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function ClassificationResult({navigation}) {
  const route = useRoute();
  const {data, type, url_store} = route.params;

  

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(getCurrentTime(), jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const BenignView = () => {
    return (
      <View style={styles.centeredContent}>
        <Image source={require('../../assets/benign_logo.png')} />
        <Text style={styles.text}>This URL has been identified as Benign</Text>
      </View>
    );
  };

  const MaliciousView = () => {
    return (
      <View style={styles.centeredContent}>
        <Image source={require('../../assets/malicious_logo.png')} />
        <Text style={styles.text}>
          This URL has been identified as{' '}
          <Text style={styles.boldText}>{data.flask}</Text>
        </Text>
      </View>
    );
  };
  const EmptyUrlView = () => {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.text}>
          URL is empty. Please provide a valid URL.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data.flask === 'Benign' ? (
        <BenignView />
      ) : data.flask === 'URL is empty please provide a valid URL' ? (
        <EmptyUrlView />
      ) : (
        <MaliciousView />
      )}
      <View style={styles.ButtonMargin} />
      <Button
        onPress={() => {
          navigation.navigate('Menu');
        }}
        title="Go back to Menu"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  centeredContent: {
    alignItems: 'center', // Center content horizontally
  },
  text: {
    textAlign: 'center', // Center text horizontally
    marginTop: 10, // Adjust margin top as needed
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold', // Apply bold font weight
    color: 'red',
  },
  ButtonMargin: {
    marginTop: 20,
  },
});
