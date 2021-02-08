import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const ResultScreen = (props) => {
    const navigateGameScreen=()=>{
        props.navigation.navigate('GameScreen')
        }
  return <View style={styles.container}>
      <Text>Result screen</Text>
      <Button title="Game Screen" onPress={navigateGameScreen} />
  </View>;
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default ResultScreen;
