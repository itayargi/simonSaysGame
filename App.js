/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
  
  // ----SIMON SAYS GAME---- //
  //1. GAME SCREEN - 4 BUTTONS, EACH WITH COLOR, SOUND-FILE AND VALUE
  //2. RESULT SCREEN - SAVE WITH REDUX & STORAGE THE BEST 10 PLAYERS

const App: () => React$Node = () => {
  return (
    <>
       <AppNavigation/>
     </>
  );
};

 
export default App;
