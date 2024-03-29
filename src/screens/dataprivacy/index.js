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
      <Text style={styles.title}>Terms and Conditions</Text>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../../assets/applogo.png')}
      />

      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox value={isChecked} onValueChange={handleCheckboxChange} />
          <Text style={styles.checkboxLabel}>
            I hereby confirm that I have read and agree with the{' '}
            <Text style={styles.linkText} onPress={toggleModal}>
              Privacy Policy and Terms and Conditions
            </Text>
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
                Lorem Ipsum Privacy It is a long established fact that a reader
                will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it
                has a more-or-less normal distribution of letters, as opposed to
                using 'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like). 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like). 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like). 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like). 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and
                the like).
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    textAlign: 'justify',
    justifyContent: 'space-between',
    height: '60%',
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
