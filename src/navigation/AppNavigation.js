import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ResultScreen from '../screens/ResultScreen';
import { StyleSheet} from 'react-native'; 
import { navigationRef, isReadyRef } from "./RootNavigation";
import {Provider} from 'react-redux';
import configureStore from '../redux/store';

const store = configureStore();

const Stack = createStackNavigator();
const MyTheme = {
    dark: false,
    colors: {
      primary: '#50d2c2',
      background: 'black',
      card: '#3333a3',
      header: '#535264',
      text: 'white',
      // border: 'rgb(180, 179, 191)',
      btn1: ['#50d2c2','#3333a3'],
      btn2: ['#3333a3',],
      white:"white",
      firstPlace:"#aaaa0e",
      topThree:"#bbbb96",
      restOfPlayers:"#707061"
    },
  };

const AppNavigation = ()=>{ 
 return (
   <Provider store={store}>
    <NavigationContainer theme={MyTheme} ref={navigationRef} >
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerLeft: '', }}
      initialRouteName="GameScreen">
      {/* GAME SCREEN */}
      <Stack.Screen
        options={{headerShown: false}}
        name="GameScreen"
        component={GameScreen}
      />
      {/* RESULT SCREEN */}
      <Stack.Screen
        options={{title: 'Result Screen', headerTitleAlign: 'center',headerTitleStyle:{color:"white"}}}
        name="ResultScreen"
        component={ResultScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
   </Provider>
 ) 
}
const styles = StyleSheet.create({
 container:{}, 
})
export default AppNavigation