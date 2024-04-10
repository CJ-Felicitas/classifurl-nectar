import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Report({navigation}) {
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

  /**
   *
   */
  const postReport = async () => {
    const response = await fetch('http://74.226.249.87:3000/api/reporturl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
      }),
    });
  
    const data = await response.json();
    console.log('Data has been reported');
    console.log(url);
  
    // Directly pass the data to storeData
    storeData({url: url, type: 'Report URL'});
  
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Report</Text>
        <TextInput
          onChangeText={newUrl => setUrl(newUrl)}
          style={styles.input}
        />
        <Button
          onPress={postReport}
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
