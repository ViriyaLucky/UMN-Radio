import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//For React Navigation 3.+ import following
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import createStackNavigator, createBottomTabNavigator, createAppContainer in our project
import Radio from './pages/Radio';
import About from './pages/About';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const App =  createMaterialBottomTabNavigator({
  Radio: {
    screen: Radio,
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="radio-tower" size={20}  color={tintColor}/>)
  } 
},
  About: { 
    screen: About,
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="information-variant" size={20}   color={tintColor}/>)
  } },
}, {
  initialRouteName: 'Radio',
  activeColor: '#ffff',
  barStyle: { backgroundColor: '#3e64ff' },

});

export default createAppContainer(App);