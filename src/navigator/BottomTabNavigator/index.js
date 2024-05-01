import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Rank from '../../screens/RankScreen';
import ImageDetailsScreen from '../../screens/MenuScreen';
import History from '../../screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigatorMenu({route}) {
  const {activeTab} = route.params || {};

  return (
    <Tab.Navigator
      initialRouteName={activeTab || 'Menu'}
      screenOptions={{headerShown: false, tabBarStyle: {height: 63}}}>
      <Tab.Screen
        name="Rank"
        component={Rank}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../../assets/rank-logo.png')}
              style={{width: 33, height: 33}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={ImageDetailsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../../assets/menu-logo.png')}
              style={{width: 40, height: 40}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../../assets/history-logo.png')}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
