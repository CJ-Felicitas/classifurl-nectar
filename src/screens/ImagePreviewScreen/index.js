/**
 * this is the image preview screen that displays the image and the text that is recognized from the image
 * it could be either upload image or scan an image
 */

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {recognizeImage} from '../MenuScreen/ImageDetailsUtils';

export default function ImagePreview({navigation}) {

  const route = useRoute();
  // Get the imageUri that is passed from the route params
  const {imageUri} = route.params;
  const {type} = route.params;

  // image displayer
  const [selectedImage, setSelectedImage] = useState(null);

  // var that holds the returned result from the text recognition module
  const [detectedText, setDetectedText] = useState(null);

  // progress spinner
  const [isLoading, setIsLoading] = useState(false);

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

  // load the recognize function when the component is mounted
  useEffect(() => {
    recognize(imageUri);
  }, []);

  // function that recognizes the text in the image
  const recognize = async imageUri => {
    setIsLoading(true);
    try {
      const result = await recognizeImage(imageUri);
      setIsLoading(false);
      setSelectedImage(imageUri);

      if (result?.blocks?.length > 0) {
        const text = result.blocks.map(block => block.text).join(' ');
        setDetectedText(text);
      } else {
        setDetectedText('No text detected');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error recognizing image:', error);
      setDetectedText('Error recognizing image');
    }
  };

  const classifyUrl = async () => {
    try {
      
      const response = await fetch('http://74.226.249.87:3000/api/submiturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: detectedText,
        }),
      });

      const data = await response.json();
      storeData({url: detectedText, type: type});
      navigation.navigate('ClassificationResult', {data});


    } catch (error) {
      
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage}}
            style={{width: 400, height: 400, marginVertical: 20}}
            resizeMode="contain"
          />
        )}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {detectedText !== null && (
          <Text style={{fontSize: 18, textAlign: 'center', margin: 20}}>
            {detectedText}
          </Text>
        )}
        <Button title='Click' onPress={classifyUrl}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
});
