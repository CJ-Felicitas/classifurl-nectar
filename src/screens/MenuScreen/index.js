import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PasteUrl from '../PasteUrlScreen';

const Drawer = createDrawerNavigator();

export default function ImageDetailsScreen({navigation}) {
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
        navigation.navigate('ImagePreview', {
          imageUri,
          type: 'Upload from gallery',
        });
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
        navigation.navigate('ImagePreview', {
          imageUri,
          type: 'Upload via Camera',
        });
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
        <Image resizeMode='contain' style={{height: 30, width: 150}} source={require('../../assets/classifurl.png')} />
        <View><Text style={{marginTop:10, color:'black'}}>Select a method to get started</Text></View>
        <View style={styles.buttonMargin} />
        {/* first button */}
        <TouchableOpacity style={styles.button} onPress={handleCameraLaunch}>
          <ImageBackground
            style={styles.imagebg}
            source={require('../../assets/button-background.png')}>
            <View style={styles.contentContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.imageSize} source={require('../../assets/scan_option.png')} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>CAPTURE URL</Text>
                <Text style={styles.subText}>
                  Point your camera to a URL to scan it for your safety.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.buttonMargin} />
        {/* second button */}
        <TouchableOpacity style={styles.button} onPress={openImagePicker}>
          <ImageBackground
            style={styles.imagebg}
            source={require('../../assets/button-background.png')}>
            <View style={styles.contentContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.imageSize} source={require('../../assets/upload_option.png')} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>UPLOAD IMAGE</Text>
                <Text style={styles.subText}>
                  Upload an image with a URL and let Classifurl check it for
                  security threats.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.buttonMargin} />
        {/* third button */}
        <TouchableOpacity style={styles.button} onPress={handlePasteUrlOption}>
          <ImageBackground
            style={styles.imagebg}
            source={require('../../assets/button-background.png')}>
            <View style={styles.contentContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.imageSize} source={require('../../assets/paste_option.png')} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>INPUT/PASTE URL</Text>
                <Text style={styles.subText}>
                  Type or paste a URL directly into Classifurl to quickly assess
                  its safety.
                </Text>
              </View>
            </View>
          </ImageBackground>
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
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  imageContainer: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Inter',
  },
  imagebg: {
    padding: 30,
    borderRadius: 10,
  },
  subText: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: 'Inter'
  },
  buttonMargin: {
    height: 20,
  },
  imageSize: {
    width: 70,
    height: 70,
  }
});
