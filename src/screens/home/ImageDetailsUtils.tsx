import {NativeModules} from 'react-native';

const {TextDetectionModule} = NativeModules;

// DO NOT REMOVE THIS FUNCTION
/**
 * DO NOT DO NOT EVER REMOVE THIS FUNCTION
 * 
 * -> this function will execute the text detection model
 * 
 * @param url 
 * @returns recognition result
 */
export const recognizeImage = (url: string) => {
  return TextDetectionModule.recognizeImage(url);
};
