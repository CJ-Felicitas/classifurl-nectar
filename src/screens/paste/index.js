import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'


export default function PasteUrl({navigation}) {
    const [url, setUrl] = useState('')
    const [reply, setReply] = useState('')
    const [urlsubmit, setUrlSubmit] = useState('')
    const postData = () => {
    fetch('http://74.226.249.87:3000/api/submiturl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type
      },
      body: JSON.stringify({
        url: url
      }), // Convert data to JSON string
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setReply(data.message)
        setUrlSubmit(data.data);
        // Handle the retrieved data here
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        // Handle errors here
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          console.error('Server responded with:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received. Request details:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error details:', error.message);
        }
      });
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