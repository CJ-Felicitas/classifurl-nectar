import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { recognizeImage } from './ImageDetailsUtils';

export default function ImageDetailsScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedText, setDetectedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setIsLoading(true);

        try {
          const result = await recognizeImage(imageUri);
          setIsLoading(false);

          if (result?.blocks?.length > 0) {
            const text = result.blocks.map((block) => block.text).join(' ');
            setDetectedText(text);
          } else {
            setDetectedText('No text detected');
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Error recognizing image:', error);
          setDetectedText('Error recognizing image');
        }
      }
    });
  };

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, async (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setIsLoading(true);

        try {
          const result = await recognizeImage(imageUri);
          setIsLoading(false);

          if (result?.blocks?.length > 0) {
            const text = result.blocks.map((block) => block.text).join(' ');
            setDetectedText(text);
          } else {
            setDetectedText('No text detected');
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Error recognizing image:', error);
          setDetectedText('Error recognizing image');
        }
      }
    });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 300, height: 300, marginVertical: 20 }}
            resizeMode="contain"
          />
        )}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {detectedText !== null && (
          <Text style={{ fontSize: 18, textAlign: 'center', margin: 20 }}>
            {detectedText}
          </Text>
        )}
        <View style={{ marginTop: 20 }}>
          <Button title="Choose from Device" onPress={openImagePicker} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Button title="Open Camera" onPress={handleCameraLaunch} />
        </View>
      </View>
    </ScrollView>
  );
}
