import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function Help() {
  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View>
          <Text style={styles.classifurl}>Classifurl is a mobile application designed to make analyzing URLs easy. With Classifurl, you can easily determine whether a URL is malicious or benign using three convenient methods: image upload, camera scanning, and manual input.</Text>
        </View>
        
        <View>
          <Text style={styles.guideTitle}>This guide will walk you through using Classifurl to classify URLs:</Text>
        </View>

        <View>
          <Text style={styles.guideHeaderText} >1. Download and Launch Classifurl</Text>
          <Text style={styles.guideContentBulletText}> &#8226; Download Classifurl</Text>
          <Text style={styles.guideContentBulletText}> &#8226; Launch the Classifurl app on your device</Text>
        </View>

        <View>
          <Text style={styles.guideHeaderText} >2. Choose Your Analysis Method</Text>
          <Text style={styles.normalText}>Classifurl offers three ways to analyze URLs:</Text>
          <Text style={styles.guideContentBulletText}> &#8226; Image Upload: If you have a picture containing a URL (like a screenshot or printout), you can upload it for analysis.</Text>
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>a. Tap the "Image Upload" button on the Classifurl home screen.</Text>
          {/* <Text style={styles.guideContentBulletText}></Text> */}
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>b. Select the image from your device's photo library containing the URL you want to analyze.</Text>
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>c. Classifurl will automatically detect and analyze the URL from the image.</Text>
          <View style={styles.space}/>
          <Text style={styles.guideContentBulletText}> &#8226; Camera Scanning: If you have a physical document with a URL, you can use your device's camera to scan it for analysis.</Text>
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>a. Tap the "Camera Scanning" button on the Classifurl home screen.</Text>
          {/* <Text style={styles.guideContentBulletText}></Text> */}
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>b. Point your device's camera at the document containing the URL, ensuring the URL is clearly visible within the frame.
</Text>
          <View style={styles.space}/>
          <Text style={styles.guideContentAlphaText}>c. Once captured, Classifurl will automatically analyze the scanned URL</Text>
          <View style={styles.space}/>
        </View>

      {/* end of container */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  classifurl:{
    textAlign: 'justify',
    fontSize: 15,
    color: 'black',
  },
  guideTitle: {
    fontSize: 16,
    color: '#914186',
    fontWeight: 'bold',
    marginTop: 20,
    fontWeight: 'bold',
  },
  guideHeaderText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
  },
  guideContentBulletText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 20,
    textAlign: 'justify'
  },
  normalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10
  },
  space: {
    height: 13,
  },
  guideContentAlphaText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 50,
    textAlign: 'justify'
  },
})