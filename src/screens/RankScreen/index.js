import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

export default function Rank({navigation}) {
  const [reportedUrls, setReportedUrls] = useState([]);

  // Function to get current time
  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString(); // Convert to local time string
  };

  useEffect(() => {
    const fetchReportedUrls = () => {
      // Define your API URL
      const apiUrl = 'http://127.0.0.1:3000/api/getreportedurl';

      // Make an HTTP GET request using fetch
      fetch(apiUrl)
        .then(response => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the JSON response
          return response.json();
        })
        .then(data => {
          // Handle successful response
          const time = getCurrentTime();
          console.log('Data retrieved successfully retrieved at :', time);
          setReportedUrls(data.data); // Assuming data property contains the array of reported URLs
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data:', error);
        });
    };

    // Fetch data initially when the component mounts
    fetchReportedUrls();

    // Set up a timer to fetch data periodically (e.g., every 30 seconds)
    const intervalId = setInterval(fetchReportedUrls, 5 * 60 * 1000); // 30 seconds interval

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Rank</Text>
      </View>
      {reportedUrls.map((url, index) => (
        <View key={url.id} style={styles.rankContainer}>
          <Text style={styles.rankTextLeft}>{index + 1}</Text>
          <Text style={styles.rankTextRight}>{url.url}</Text>
          <Text style={styles.rankTextLeft}>{url.report_count}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    margin: 5,
  },
  rankContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#59034D',
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  rankTextRight: {
    color: 'white',
    fontSize: 15,
  },
  rankTextLeft: {
    color: 'white',
    fontSize: 15,
  },
});
