import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'

export default function Report({navigation}) {
  const [url, setUrl] = useState('');
  // const [detectedText, setDetectedText] = useState('');

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
    console.log("Data has been reported");
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
