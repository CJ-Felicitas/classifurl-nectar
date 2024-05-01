import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
  const [historyData, setHistoryData] = useState([]);

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error);
      throw error;
    }
  };

  // Function to get all data from AsyncStorage
  const getAllData = async () => {
    try {
      // Get all keys stored in AsyncStorage
      const keys = await AsyncStorage.getAllKeys();

      // Retrieve data for each key using multiGet
      const data = await AsyncStorage.multiGet(keys);

      // Convert data to an array of objects
      const allData = data.map(([key, value]) => {
        return {key, data: JSON.parse(value)};
      });

      console.log(allData);
      return allData;
    } catch (error) {
      console.error('Error getting all data from AsyncStorage:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
        const data = await getAllData();
        setHistoryData(data);
        console.log(historyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially when component mounts
    fetchData();

    // Set up a timer to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.imageSize}
          source={require('../../assets/history_icon.png')}
        />
        <Text style={styles.title}>History</Text>
      </View>

      <FlatList
        data={historyData}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View>
              {/* Conditionally render image based on item.data?.type */}
              {item.data?.type === 'Paste URL' && (
                <Image
                  style={{height: 90, width: 90}}
                  source={require('../../assets/paste_option.png')}
                />
              )}
              {item.data?.type === 'Upload from gallery' && (
                <Image
                  style={{height: 90, width: 90}}
                  source={require('../../assets/upload_option.png')}
                />
              )}
              {item.data?.type === 'Upload via Camera' && (
                <Image
                  style={{height: 90, width: 90}}
                  source={require('../../assets/scan_option.png')}
                />
              )}
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.key}>{item.key}</Text>
              <Text style={styles.leftText}>Type: {item.data?.type}</Text>
              <Text style={styles.rightText}>URL: {item.data?.url}</Text>
              <Text style={styles.rightText}>Result: {item.data?.result}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.key.toString()}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearAllData}>
          <Text style={styles.buttonText}>CLEAR HISTORY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#780000',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  key: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  leftText: {
    fontWeight: 'bold',
    color: 'blue', // Example color for type
    marginTop: 2,
  },
  rightText: {
    color: 'green', // Example color for URL
    marginTop: 2,
  },
  imageSize: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
    maxWidth: '70%',
    borderColor: '#914186'
  },
  buttonContainer :{
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black'
  }
});
