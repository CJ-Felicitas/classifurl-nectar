import {NativeModules} from 'react-native';
const {TextDetectionModule} = NativeModules;
/**
 * @param url 
 * @returns recognition result
 */
export const recognizeImage = (url: string) => {
  return TextDetectionModule.recognizeImage(url);
};
