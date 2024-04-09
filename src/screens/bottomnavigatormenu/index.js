import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Rank from '../rank';
import ImageDetailsScreen from '../home/ImageDetailsScreen';
import History from '../history';

const Tab = createBottomTabNavigator();

export default function BottomNavigatorMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Rank" component={Rank} />
    <Tab.Screen name="Menu" component={ImageDetailsScreen} />
    <Tab.Screen name="History" component={History} />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})