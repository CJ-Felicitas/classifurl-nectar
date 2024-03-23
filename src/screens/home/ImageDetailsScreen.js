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
import {recognizeImage} from './ImageDetailsUtils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function ImageDetailsScreen({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedText, setDetectedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const Tab = createBottomTabNavigator();

  // opens the gallery
  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // wala ko kabalo ani unsaon pag pa gana ani
    launchImageLibrary(options, async response => {
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

    // wala sad ko kabalo para sa asa ni
    launchCamera(options, async response => {
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
      }
    });
  };

  const handlePasteUrlOption = () => {
    console.log('PasteUrl Component Opened');
    navigation.navigate('PasteUrl');
  };

  // sample code for get request
  // ***************************
  // const fetchData = () => {
  //   // Ensure you include the protocol (http or https) in the URL
  //   fetch('http://74.226.249.87:3000/api')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Data received:', data);
  //       setServerResponse(data.message);
  //       // Handle the retrieved data here
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error.message);
  //       // Handle errors here
  //       if (error.response) {
  //         // The request was made and the server responded with a non-2xx status code
  //         console.error('Server responded with:', error.response.data);
  //         console.error('Headers:', error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error('No response received. Request details:', error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error('Error details:', error.message);
  //       }
  //     });
  // };

  // sample code for post request
  // ****************************
  // const postData = () => {

  //   // Ensure you include the protocol (http or https) in the URL
  //   // http://74.226.249.87:3000/api/submiturl

  //   fetch('http://74.226.249.87:3000/api/submiturl', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // Specify content type
  //     },
  //     body: JSON.stringify({
  //       url: "youtube.com",
  //     }), // Convert data to JSON string
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Data received:', data);
  //       setServerResponse(data.message);
  //       // Handle the retrieved data here
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error.message);
  //       // Handle errors here
  //       if (error.response) {
  //         // The request was made and the server responded with a non-2xx status code
  //         console.error('Server responded with:', error.response.data);
  //         console.error('Headers:', error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error('No response received. Request details:', error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error('Error details:', error.message);
  //       }
  //     });
  // };

  return (
    // this commented code works before and this is the first ever code that ocr works
    // ************************
    // <ScrollView>
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     {selectedImage && (
    //       <Image
    //         source={{ uri: selectedImage }}
    //         style={{ width: 300, height: 300, marginVertical: 20 }}
    //         resizeMode="contain"
    //       />
    //     )}
    //     {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    //     {detectedText !== null && (
    //       <Text style={{ fontSize: 18, textAlign: 'center', margin: 20 }}>
    //         {detectedText}
    //       </Text>
    //     )}
    //     <View style={{ marginTop: 20 }}>
    //       <Button title="Choose from Device" onPress={openImagePicker} />
    //     </View>
    //     <View style={{ marginTop: 20, marginBottom: 50 }}>
    //       <Button title="Open Camera" onPress={handleCameraLaunch} />
    //     </View>
    //   </View>
    // </ScrollView>

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
        <TouchableOpacity onPress={handlePasteUrlOption} style={styles.submitOption}>
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
