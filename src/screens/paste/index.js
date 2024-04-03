import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'


export default function PasteUrl({navigation}) {
    const [url, setUrl] = useState('')
    const [reply, setReply] = useState('')
    const [urlsubmit, setUrlSubmit] = useState('')

    const postData = async () => {
      try {
        // 
          const response = await fetch('http://74.226.249.87:3000/api/submiturl', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  url: url
              }),
          });
          
          if (!response.ok) {
              throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
          }
  
          const data = await response.json();
          console.log(data);
          console.log('Data received:', data.data);
          console.log('Server response', data.flask);
          setReply("nebula(express) = " + data.message + "themis (flask) = " + data.flask)
          setUrlSubmit(data.data.url);
      } catch (error) {
          console.error('Error fetching data:', error.message);
      }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Paste URL</Text>
      <TextInput
      onChangeText={(newUrl) => setUrl(newUrl)} // Corrected line here
      style={styles.input}
      />
      <Button onPress={postData} style={styles.fixToText} title='Submit URL' />
      <Text style={styles.title}>{reply}</Text>
      <Text style={styles.title}>the url you sent is "{urlsubmit}"</Text>
    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 30,
        color: 'black'    
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
})