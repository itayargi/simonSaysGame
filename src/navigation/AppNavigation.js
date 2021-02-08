import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import {View, StyleSheet, Text, } from 'react-native'; 
import { navigationRef, isReadyRef } from "./RootNavigation";


const Stack = createStackNavigator();
const MyTheme = {
    dark: false,
    colors: {
      primary: '#50d2c2',
      background: 'black',
      card: '#3333a3',
      header: '#535264',
      text: '#222310',
      border: 'rgb(180, 179, 191)',
      btn1: ['#50d2c2','#3333a3'],
      btn2: ['#3333a3',],
    },
  };

const AppNavigation = ()=>{ 
 return (
    <NavigationContainer theme={MyTheme} ref={navigationRef} >
    <Stack.Navigator
      // headerMode="screen"
      screenOptions={{animationEnabled: false, headerLeft: '', }}
      initialRouteName="GameScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="GameScreen"
        component={GameScreen}
      />
      <Stack.Screen
        options={{title: 'Result Screen', headerTitleAlign: 'center',headerTitleStyle:{color:"white"}}}
        name="ResultScreen"
        component={ResultScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
 ) 
}
const styles = StyleSheet.create({
 container:{}, 
})
export default AppNavigation