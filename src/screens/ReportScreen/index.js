import {StyleSheet, Text, View, TextInput, Button, Image,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

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
    // <View style={styles.container}>
    //   <View>
    //     <Text style={styles.title}>Report</Text>
    //     <TextInput
    //       onChangeText={newUrl => setUrl(newUrl)}
    //       style={styles.input}
    //     />
    //     <Button
    //       onPress={postReport}
    //       style={styles.fixToText}
    //       title="Submit URL"
    //     />
    //   </View>
    // </View>

<View style={styles.container}>
<View style={styles.content}>
  <Image source={require('../../assets/paste_logo.png')} />
  <TextInput
    onChangeText={newUrl => setUrl(newUrl)}
    style={styles.input}
    placeholder='Paste the URL here'
  />
  <TouchableOpacity onPress={postReport}>
    <LinearGradient
      colors={['#BC52AE', '#853B7B', '#672C5F']}
      style={styles.linearGradient}>
      <Text style={styles.buttonText}>REPORT URL</Text>
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

