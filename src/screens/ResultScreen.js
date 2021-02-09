import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Text, Button} from 'react-native';
import {connect} from 'react-redux';

const ResultScreen = (props) => {
  const reduxState = props.scores;
  console.log('state', reduxState)
  let listByOrder =orderList(reduxState)
  const [userList,setUserList]= useState(listByOrder)

function orderList  (list=[]){
  if (list !== undefined){
    let orderedList= list.sort((a,b)=> a.score<b.score)
    return orderedList
  }
}
 
  useEffect(()=>{
    let playersF = AsyncStorage.setItem('@users', JSON.stringify(reduxState));
  },[reduxState])

  const renderUsers = (array) => {
    if (array && array.length > 0) {
      let list = array.map((user, index) => {
        return (
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor:"white",
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={index}>
            <Text style={styles.userText}>{user.name}</Text>
            <Text style={styles.userText}>{user.score}</Text>
          </View>
        );
      });
      return list;
    }
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.userText}>The list is empty</Text>
        <Text style={styles.userText}>Press start to play</Text>
      </View>
    )
  };
  const navigateGameScreen = () => {
    props.navigation.navigate('GameScreen');
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
        <Text style={styles.userText}>Name</Text>
        <Text style={styles.userText}>Score</Text>

      </View>
      {/* list */}
      <View style={{flex: 1}}>{renderUsers(userList)}</View>
      <Button title="Game Screen" onPress={navigateGameScreen} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding:10},
  userText:{
    color:"white"
  }
});
function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps)(ResultScreen);
