import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

export default function Aboutus() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.aboutus}>
          Empower yourself with Classifurl, a mobile application designed to
          streamline the analysis of URLs effortlessly. This innovative tool
          equips users with three distinct methods to initiate URL
          classification, ensuring a comprehensive and user-friendly experience.{' '}
        </Text>
      </View>

      <View>
        <Text style={styles.methodsTitle}>Versatile Analysis Methods:</Text>
      </View>

      <View>
        <Text style={styles.methods}>
          Image Upload: Seamlessly upload images containing plain text URLs to
          the application.
        </Text>
        <Text style={styles.methods}>
          Camera Scanning: Utilize your device's camera to scan images with
          plain text URLs for quick analysis.
        </Text>
        <Text style={styles.methods}>
          Manual Input: Enter the entire plain text of a URL directly into the
          application with ease.
        </Text>
      </View>

      <View>
        <Text style={styles.automaticAnalysisTitle}>Automatic Analysis:</Text>
      </View>

      <View>
        <Text style={styles.automaticAnalysis}>
          Upon receiving a URL through any of the aformentioned methods,
          Classifurl springs into action with an automatic analysis. Whether the
          URL is submitted through image upload, scanning, or manual input, the
          system promptly processes the information and conveys a clear
          classifcation - malicious or benign to the user
        </Text>
      </View>

      <View>
        <Text style={styles.machineLearningatitsCoreTitle}>Machine Learning at its Core:</Text>
      </View>
      <View>
        <Text style={styles.machineLearningAtitsCore}>
          Powering Classifurl is an advanced machine learning model specifically
          designed for the classification of URLs. The model undergoes rigorous
          training using a labeled URL dataset, honing its capabilities to
          distinguish between benign and malicious URLs effectively. Once
          trained, the model stands ready to classify new URLs with precision,
          providing users with real-time insights into the nature of the web
          content.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container :{
    padding: 25,
  }, 
  aboutus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    color: 'black',
   
  },
  methodsTitle: {
    flex: 1,
    textAlign: 'justify',
    color: '#914186',
    fontWeight: 'bold'
  },
  methods : {
    flex: 1,
    textAlign: 'justify',
    color: 'black',
    marginTop: 10,
  },
  automaticAnalysisTitle: {
    flex: 1,
    textAlign: 'justify',
    color: '#914186',
    fontWeight: 'bold',
    marginTop: 20,
  },
  automaticAnalysis: {
    flex: 1,
    textAlign: 'justify',
    color: 'black',
    marginTop: 10,
  },
  machineLearningatitsCoreTitle: {
    flex: 1,
    textAlign: 'justify',
    color: '#914186',
    fontWeight: 'bold',
    marginTop: 20,
  },
  machineLearningAtitsCore :{
    flex: 1,
    textAlign: 'justify',
    color: 'black',
    marginTop: 10,
  }
});
