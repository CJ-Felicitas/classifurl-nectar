import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useRoute} from '@react-navigation/native';

export default function ClassificationResult({navigation}) {
    
    const route = useRoute();
    // the data that is passed from the image preview
    const {data} = route.params;
    return (
    <View>
      <Text>{data.flask}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})