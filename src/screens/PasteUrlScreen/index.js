import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <View>
        <Text style={styles.title}>Paste URL</Text>
        <TextInput
          onChangeText={newUrl => setUrl(newUrl)}
          style={styles.input}
        />
        <Button
          onPress={postData}
          style={styles.fixToText}
          title="Submit URL"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: 'black',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
