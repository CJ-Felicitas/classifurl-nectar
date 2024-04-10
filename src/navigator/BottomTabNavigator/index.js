import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Rank from '../../screens/RankScreen';
import ImageDetailsScreen from '../../screens/MenuScreen';
import History from '../../screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigatorMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{height:55 } }}>
    <Tab.Screen
        name="Rank"
        component={Rank}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/rank-logo.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
    <Tab.Screen
        name="Menu"
        component={ImageDetailsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/applogo.png')}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
        <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/history-logo.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})