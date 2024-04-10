import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
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
      <Text style={styles.title}>History</Text>
      <FlatList
        data={historyData}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.key}>Date and Time: {item.key}</Text>
            {/* Display type on the left side and URL on the right side */}
            <View style={styles.rowContainer}>
              <Text style={styles.leftText}>Type: {item.data?.type}</Text>
              <Text style={styles.rightText}>URL: {item.data?.url}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.key.toString()}
      />
      <Text style={{textAlign: 'center'}}>this button is for testing only</Text>
      <Button title="Clear History" onPress={clearAllData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
});
