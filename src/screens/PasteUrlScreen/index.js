import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
export default function PasteUrl({navigation}) {
  const [url, setUrl] = useState('');
  const [jsonData, setJsonData] = useState(null);

  // get the current time
  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString(); // Convert to local time string
  };

  // store the data into the async storage for history data
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(getCurrentTime(), jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const postData = async () => {
    try {
      // post requests the data to the api server
      // the url is the url that the user inputs
      // the response is the data that is returned from the server
      // the data is the json data that is returned from the server
      // the flask is the data that is returned from the flask server

      // data flows like this:
      // classifurl-nectar (react-native) -> classifurl-nebula (express) -> classifurl-themis (flask)

      const response = await fetch('http://74.226.249.87:3000/api/submiturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok (${response.status} - ${response.statusText})`,
        );
      }

      const data = await response.json();
      storeData({url: url, type: 'Paste URL'});
      navigation.navigate('ClassificationResult', {data});
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/paste_logo.png')} />
        <TextInput
          onChangeText={newUrl => setUrl(newUrl)}
          style={styles.input}
          placeholder='Paste the URL here'
        />
        <TouchableOpacity onPress={postData}>
          <LinearGradient
            colors={['#BC52AE', '#853B7B', '#672C5F']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>SCAN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    padding: 20,
  },
  content: {
    alignItems: 'center', // Center content horizontally
  },
  input: {
    height: 40,
    marginVertical: 12, // Adjust vertical margin
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '100%', // Take full width
  },
  button: {
    marginTop: 20, // Adjust margin top as needed
  },
  buttonBackground: {
    width: '100%',
    height: 40, // Adjust height as needed
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  imagebg: {
    padding: 30,
    borderRadius: 10,
  },
  linearGradient: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color : 'white'
  }
});
