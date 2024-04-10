import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import { classifyurl } from '../../functions/Classify';


export default function PasteUrl({navigation}) {
  const [url, setUrl] = useState('');

  const classify = async () => {
      const data = await classifyurl(url);
      navigation.navigate('ClassificationResult', {data});
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Paste URL</Text>
        <TextInput
          onChangeText={newUrl => setUrl(newUrl)} 
          style={styles.input}
        />
        <Button
          onPress={classify}
          style={styles.fixToText}
          title="Submit URL"
        />
        {/* <Text style={styles.title}>{reply}</Text>
        <Text style={styles.title}>the url you sent is "{urlsubmit}"</Text> */}
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
