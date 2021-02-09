import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ModalScreen from '../componenets/ModalScreen';
// import SimonBtn from '../components/SimonBtn';
// import {DataStorage} from '../context/DataStorage';
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
  const maxPlayersOnList = 3;
  const sumOfPlayers = reduxState.length;

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

  const LevelUp = async() => {
    // list still empty -enter the user
    if (sumOfPlayers < maxPlayersOnList) {
      props.dispatch({type: 'ADDPRESS', name: userName, score: userLevel});
    }
    // the list has max player- check result to see if the user enter the list
    else {
      let userEnter = checkifUserEnterList(userLevel);
      if (userEnter) {
        props.dispatch({type: 'ADDPRESS', name: userName, score: userLevel});
        // save the new list in storage
      }
      // user is not joining the list- just navigate to ResultScreen
      else {
        console.log('you are not enter the list');
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
        style={{
          fontSize: 32,
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          color: 'white',
        }}>
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
      {/* start btn */}
      <ModalScreen
        LevelUp={LevelUp}
        winGame={winGame}
        userName={userName}
        setUserName={setUserName}
        navigation={navigation}
        setModalShow={setModalShow}
        modalShow={modalShow}
      />
      {/* <Button title="sore" onPress={navigateResult} /> */}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps)(GameScreen);
