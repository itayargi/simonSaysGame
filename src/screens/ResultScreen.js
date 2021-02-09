import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import PlayersList from '../componenets/PlayersList';
import FadeInView from '../componenets/FadeInView';

const ResultScreen = (props) => {
  const reduxState = props.scores;
  console.log('state', reduxState);
  let listByOrder = orderList(reduxState);
  const [userList, setUserList] = useState(listByOrder);

  function orderList(list = []) {
    if (list !== undefined) {
      let orderedList = list.sort((a, b) => a.score < b.score);
      return orderedList;
    }
  }

  useEffect(() => {
    let playersF = AsyncStorage.setItem('@users', JSON.stringify(reduxState));
  }, [reduxState]);

  
  const navigateGameScreen = () => {
    props.navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      {/* list */}
      <FadeInView style={{flex: 1}}>
        {userList.length > 0 ? (
          <PlayersList playersList={userList} />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.userText}>The list is empty</Text>
            <Text style={styles.userText}>Press start to play</Text>
          </View>
        )}
      </FadeInView>
      <Button title="Game Screen" onPress={navigateGameScreen} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, maxWidth:"100%"},
  userText: {
    color: 'white',
  },
});
function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps)(ResultScreen);
