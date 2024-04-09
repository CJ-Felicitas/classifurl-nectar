import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomNavigatorMenu from '../bottomnavigatormenu';
import Report from '../report';
import Help from '../help';
import Aboutus from '../aboutus';

const Drawer = createDrawerNavigator();

export default function Home() {


  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomNavigatorMenu} />
      <Drawer.Screen name="Report" component={Report} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="About us" component={Aboutus} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
