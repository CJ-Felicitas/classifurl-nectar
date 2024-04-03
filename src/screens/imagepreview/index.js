import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {recognizeImage} from '../home/ImageDetailsUtils';

export default function ImagePreview({navigation}) {
  const route = useRoute();
  const {imageUri} = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedText, setDetectedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    recognize(imageUri);
  }, []);

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

  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage}}
            style={{width: 500, height: 500, marginVertical: 20}}
            resizeMode="contain"
          />
        )}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {detectedText !== null && (
          <Text style={{fontSize: 18, textAlign: 'center', margin: 20}}>
            {detectedText}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
