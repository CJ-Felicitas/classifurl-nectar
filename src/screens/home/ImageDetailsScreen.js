import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import {recognizeImage} from './ImageDetailsUtils';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function ImageDetailsScreen({navigation}) {
  const Tab = createBottomTabNavigator();

  // function the image picker/phone gallery
  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // function that opens the image picker from the react-native-image-picker library
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        // retrieved metadata from the image picker library
        let imageUri = response.uri || response.assets?.[0]?.uri;

        // if the imageUri is not null, navigate to the ImagePreview screen
        navigation.navigate('ImagePreview', {imageUri});
      }
    });
  };

  // opens the camera
  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // opens the camera from the react-native-image-picker library
    launchCamera(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // retrieves the metadata that is returned from the image-picker-library
        let imageUri = response.uri || response.assets?.[0]?.uri;
        // if the imageUri is not null, navigate to the ImagePreview screen
        navigation.navigate('ImagePreview', {imageUri});
      }
    });
  };

  const handlePasteUrlOption = () => {
    console.log('PasteUrl Component Opened');
    navigation.navigate('PasteUrl');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcome}>Classifurl</Text>
        <Text style={styles.slogan_one}>
          this is a slogan lorem ipsum something in here
        </Text>
        <Text style={styles.slogan_two}>this is a slogan second row</Text>

        {/* first option = scan option */}
        <TouchableOpacity
          onPress={handleCameraLaunch}
          style={styles.submitOption}>
          <View style={styles.submitOptionImageView}>
            <Image
              source={require('../../assets/scan_option.png')}
              style={styles.submitOptionImage}
            />
          </View>
          <View style={styles.submitOptionTextView}>
            <Text style={styles.submitOptionText}>Scan Image</Text>
          </View>
        </TouchableOpacity>

        {/* second option = upload image option*/}
        <TouchableOpacity onPress={openImagePicker} style={styles.submitOption}>
          <View style={styles.submitOptionImageView}>
            <Image
              source={require('../../assets/upload_option.png')}
              style={styles.submitOptionImage}
            />
          </View>
          <View style={styles.submitOptionTextView}>
            <Text style={styles.submitOptionText}>Upload Image</Text>
          </View>
        </TouchableOpacity>

        {/* third option = paste url option*/}
        <TouchableOpacity
          onPress={handlePasteUrlOption}
          style={styles.submitOption}>
          <View style={styles.submitOptionImageView}>
            <Image
              source={require('../../assets/paste_option.png')}
              style={styles.submitOptionImage}
            />
          </View>
          <View style={styles.submitOptionTextView}>
            <Text style={styles.submitOptionText}>Paste URL</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  submitOption: {
    flex: 1,
    flexDirection: 'row',
    padding: 40,
    backgroundColor: 'green',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  submitOptionImage: {
    width: 65,
    height: 65,
  },
  submitOptionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  submitOptionTextView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  submitOptionImageView: {
    marginRight: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
  },
  slogan_one: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  slogan_two: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginBottom: 10,
  },
});
