import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ModalScreen from '../componenets/ModalScreen';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimonBoard from '../componenets/SimonBoard';
import {connect} from 'react-redux';

const GameScreen = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const {colors} = useTheme();
  const [userName, setUserName] = useState('');
  const [userLevel, setUserLevel] = useState();
  const navigation = props.navigation;
  const reduxState = props.scores;
  const maxPlayersOnList = 10;
  const sumOfPlayers = reduxState.length;

  // CHECK IF USER'S SCORE IS ENOUGH TO ENTER THE LIST 
  const checkifUserEnterList = (score) => {
    let otherLowerUser = reduxState.find((user) => user.score <= score);
    if (otherLowerUser !== undefined) {
      props.dispatch({type: 'DELETEUSER', id: otherLowerUser.id});
      return true;
    } else return false;
  };
 
   // load users list from storage
 const loadState = async() => {
  try {
    const serializedState =await AsyncStorage.getItem('@users');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 
 // upload storage to state
 const updateStateFromStorage= async()=>{
let listFromStorage=await loadState();
if (listFromStorage !== undefined){
  console.log('listFromStorage',listFromStorage)
  let copyToState = listFromStorage.map((user)=>{
    props.dispatch({type: 'ADDPRESS', name: user.name, score: user.score});
  })
}
}
// WHEN GAME IS FINISH FUNCTION => ENTER/NOT ENTER THE USER TO THE LIST
  const LevelUp = async() => {
    //if list is less than 10 players -enter the user
    if (sumOfPlayers < maxPlayersOnList) {
      props.dispatch({type: 'ADDPRESS', name: userName, score: userLevel});
    }
    // the list has 10 players- check result to see if the user enter the list
    else {
      let userEnter = checkifUserEnterList(userLevel);
      if (userEnter) {
        props.dispatch({type: 'ADDPRESS', name: userName, score: userLevel});
      }
      // user is not joining the list- just navigate to ResultScreen
      else {
        console.log('you are not in the list');
      }
    }
  };
  useEffect(() => {
    console.log('userLevel', userLevel);
  }, [userLevel]);
  useEffect(()=>{
    updateStateFromStorage()
  },[])

  return (
    <LinearGradient
      colors={['#4c669f', '#3f4250', '#111108']}
      style={styles.container}>
      <Text
        style={styles.welcome}>
        Welcome
      </Text>
      {/* Simon btns */}
      <SimonBoard
        setWinGame={setWinGame}
        colors={colors}
        navigation={navigation}
        setUserLevel={setUserLevel}
        setModalShow={setModalShow}
        modalShow={modalShow}
      />
      {/* modal to enter user name when game is finished */}
      <ModalScreen
        LevelUp={LevelUp}
        winGame={winGame}
        userName={userName}
        setUserName={setUserName}
        navigation={navigation}
        setModalShow={setModalShow}
        modalShow={modalShow}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome:{
    fontSize: 32,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'white',
  },
});
function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps)(GameScreen);
