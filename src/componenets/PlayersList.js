import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

const PlayersList = (props) => {
  const {colors} = useTheme();
  const playersList = props.playersList;
  const silverUri =
    'https://img.icons8.com/cotton/64/000000/olympic-medal-silver.png';
  const trophyUri = 'https://img.icons8.com/doodle/48/000000/trophy--v1.png';
  return (
    <View style={styles.listBox}>
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: colors.white}]}>Name</Text>
        <Text style={[styles.headerText, {color: colors.white}]}>Level</Text>
      </View>
      {playersList.map((player, index) => {
        return (
          <View
            key={index}
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 20, alignItems: 'center'}}>
              <Text style={{color: colors.white}}>{index + 1}</Text>
            </View>
            <View
              style={[
                styles.player,
                {
                  backgroundColor:
                    index == 0
                      ? colors.firstPlace
                      : index < 4
                      ? colors.topThree
                      : colors.restOfPlayers,
                },
              ]}>
              <Text style={{color: colors.text}}>{player.name}</Text>
              <Text style={{color: colors.text}}>{player.score}</Text>
              
            </View>
            <View style={{  flex:0.1, alignItems:"center"}}>
            {index == 0 && (
              <Image
                style={{width: 30, height: 30}}
                source={{uri: trophyUri}}
              />
            )}
            {index > 0 && index < 4 && (
              <Image
                style={{width: 30, height: 30}}
                source={{uri: silverUri}}
              />
            )}
            </View>
          
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  listBox: {
    flex: 1,
    // padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  headerText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '85%',
    flex:0.9,
    borderBottomWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
});
export default PlayersList;
