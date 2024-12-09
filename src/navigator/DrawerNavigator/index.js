import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomNavigatorMenu from '../BottomTabNavigator';
import Report from '../../screens/ReportScreen';
import Help from '../../screens/HelpScreen';
import Aboutus from '../../screens/AboutUsScreen';

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={BottomNavigatorMenu}
        options={{
          title: 'Home',
          headerTitle: 'Home',
          initialParams: {activeTab: 'Menu'},
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{title: 'Report', headerTitle: 'Report'}}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{title: 'Help', headerTitle: 'Help Center'}}
      />
      <Drawer.Screen
        name="About us"
        component={Aboutus}
        options={{title: 'About us', headerTitle: 'About Us'}}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
