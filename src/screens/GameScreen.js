import React,{useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ModalScreen from '../componenets/ModalScreen';
// import SimonBtn from '../components/SimonBtn';
// import {DataStorage} from '../context/DataStorage';
import LinearGradient from 'react-native-linear-gradient';
// import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimonBoard from '../componenets/SimonBoard';
const GameScreen = ({navigation}) => {
  const [modalShow, setModalShow] = useState(false);
  const [winGame, setWinGame] = useState(false);
//   const {colors} = useTheme();

  return (
    <LinearGradient
      colors={['#4c669f', '#3f4250', '#111108']}
      style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          color:"white"
        }}>
        Welcome
      </Text>
      {/* Simon btns */}
      <SimonBoard
        // colors={colors}
        navigation={navigation}
        // setUserData={setUserData}
        setWinGame={setWinGame}
        setModalShow={setModalShow}
        modalShow={modalShow}
      />
      {/* start btn */}
      <ModalScreen
        // setUserData={setUserData}
        // userData={userData}
        winGame={winGame}
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
export default GameScreen;
