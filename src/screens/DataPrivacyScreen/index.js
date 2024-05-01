import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

export default function DataPrivacyScreen({navigation}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAgreeButtonClick = () => {
    if (isChecked) {
      navigation.navigate('HomeScreen');
      console.log('User has agreed.');
    } else {
      console.log('User must agree to the terms and conditions.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/applogo.png')}
        />
      </View>
      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={isChecked} onValueChange={handleCheckboxChange} />
          <Text style={styles.checkboxLabel}>
            By continuing, you're accepting our Terms of Service. To learn more, see the {' '}
            <Text style={styles.linkText} onPress={toggleModal}>
              Privacy Policy and Terms and Conditions
            </Text>
            <Text> of Classifurl.</Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isChecked ? '#007AFF' : 'gray'},
            ]}
            onPress={handleAgreeButtonClick}
            disabled={!isChecked}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <Text style={styles.modalActualContent}>
                Privacy and transparency are fundamental principles that
                contribute to a secure cyber environment by preventing potential
                misuse and improper handling of data. In adherence to these
                principles and recognizing the significance of Republic Act No.
                10173, also known as the Data Privacy Act of 2012 (DPA),
                Classifurl, a mobile-based application designed for classifying
                malicious URLs, places a strong emphasis on individual rights
                and protection concerning the processing of information through
                Information and Communication Systems. 
                {/*  */}
                When utilizing Classifurl, users are required to capture, upload, or input the
                URL link for analysis. It is crucial to note that all uploaded
                images and captured pictures are not stored within the
                application. Consequently, these images are automatically
                deleted after the URL has been successfully scanned, ensuring
                that user data is handled with the utmost care and privacy. 
                {/*  */}
                The primary objective of this Data Privacy Statement is to establish
                a foundation and guide involving sensitive data. This includes
                the responsible usage of consent forms and upholding the
                integrity of the data privacy policy ...
              </Text>
              <View style={styles.modalCloseTextContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 0.98,
    margin: 0,
    borderBottomLeftRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#914186',
  },
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  termsText: {
    marginTop: 'auto',
    textAlign: 'justify',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
    justifyContent: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    textAlign: 'justify',
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContent: {
    margin: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    textAlign: 'justify',
    justifyContent: 'space-between',
    height: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalActualContent: {
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: 'justify',
  },
  modalCloseText: {
    textDecorationLine: 'none',
    marginTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#007AFF',
    padding: 7,
    borderRadius: 10,
  },
  modalCloseTextContainer: {
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
