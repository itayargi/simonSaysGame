import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIMONBTN} from '../../android/app/src/images';
import * as RNLocalize from 'react-native-localize';
import { useLinkProps } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

const SimonBoard = (props) => {
  const [pressNotAllowed, setPressNotAllow] = useState(true);
  const [redBtn, setRedBtn] = useState('red');
  const [greenBtn, setGreenBtn] = useState('green');
  const [blueBtn, setBlueBtn] = useState('blue');
  const [yellowBtn, setYellowBtn] = useState('yellow');
  const randomNumber = Math.floor(Math.random() * 4 + 1);
// hook for saving btn press
  const [btnPress, setBtnPress] = useState(
    {
      stage: [randomNumber],
      index: 0,
      numOfMoves: 10,
    },
);
  const color1 = props.colors.btn1[0];
  const color2 =  props.colors.btn1[1];

//   align
const hebrewAlign = {
    first:"90deg",
    sec:"0deg",
    third:"180deg",
    four:"270deg"
  }
  const englishAlign = {
    first:"0deg",
    sec:"90deg",
    third:"270deg",
    four:"180deg"
  }
  const device = RNLocalize.getLocales();
  const alignToLaguage = device && device[0].languageTag == "he-IL" ? hebrewAlign : englishAlign
  const endFlash = 1000;
  const gameSpeed = 1700;
  const stageArray = btnPress.stage.map((btnNum) => btnNum);
const userLevel = btnPress.stage.length
//   btn flash actions
const redFlash = () => {
    setRedBtn('#ffb6c1')
    wait(endFlash).then(() => setRedBtn('red'));
  };
  const greenFlash = () => {
    setGreenBtn('#adff2f')
    wait(endFlash).then(() => setGreenBtn('green'));
  };
  const blueFlash = () => {
    setBlueBtn('#add8e6')
    wait(endFlash).then(() => setBlueBtn('blue'));
  };
  const yellowFlash = () => {
    setYellowBtn('#fffacd')
    wait(endFlash).then(() => setYellowBtn('yellow'));
  };
  const optionsObj = [
    redFlash,greenFlash,blueFlash,yellowFlash
  ]
 
//   comp press
const computerTurnPress = () => {
    setPressNotAllow(true);
    var i = 0;
    let intervalId = setInterval(() => {
      if (stageArray[i] == undefined) {
        clearInterval(intervalId);
        setPressNotAllow(false);
      } else {
        let btnById = optionsObj[stageArray[i]-1]
        let action = btnById()
      }
      i++;
    }, gameSpeed);
    setBtnPress({...btnPress, index:0})
  };
// navigate to ResultScreen
const navigateResult=()=>{
props.navigation.navigate('ResultScreen')
}
  // my click
  const myPressFlash = (num) => {
      const myPress = num;
      const indexInArray = btnPress.index;
      const tatalNumInArray = btnPress.stage.length
      const btnNumInArray = btnPress.stage[indexInArray];
    //   if the user has a mistake
    if(myPress !== btnNumInArray){
        Alert.alert('wrong number')
        setBtnPress({stage:[randomNumber], index:0, numOfMoves:10})
    }
    else if (indexInArray + 1<tatalNumInArray){
        // next index to check
        setBtnPress({...btnPress,index:btnPress.index + 1,})
    }
    else{
        setBtnPress({...btnPress,index:0, numOfMoves:btnPress.numOfMoves - 1, stage:[...btnPress.stage, randomNumber]})
    }
  };
  const startBtn = ()=>{
      if(btnPress.stage.length == 1){
          computerTurnPress()
      }
  }

  useEffect(()=>{
      if (btnPress.stage.length>1){
          computerTurnPress()

      }
  },[btnPress.stage])
  // simon btn
  const renderSimonBtn = (onPress, stylesBtn, styleImage) => {
    return (
      <TouchableOpacity
        disabled={pressNotAllowed}
        onPress={onPress}
        style={stylesBtn}>
        <Image style={styleImage} source={SIMONBTN} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{justifyContent: 'space-around', flex: 1}}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text style={{fontSize: 22, color: 'white'}}>Press start to play</Text>
      </View>

      {/* btns */}
      <View style={{}}>
        {/* status circle */}
        <View style={styles.fullScreen}>
          <View style={styles.statusShape}>
            <Text style={styles.statusText}>Level:</Text>
            <Text style={[styles.statusText]}>{userLevel}</Text>
          </View>
        </View>
        {/* first row btns (red and green) */}
        <View style={styles.btnPlayRow}>
          {renderSimonBtn(() => myPressFlash(1), styles.btnSingle, [
            styles.btnImage,

            {tintColor: redBtn, transform: [{rotate: alignToLaguage.first}]},
          ])}
          {renderSimonBtn(() => myPressFlash(2), styles.btnSingle, [
            styles.btnImage,
            {tintColor: greenBtn, transform: [{rotate: alignToLaguage.sec}]},
          ])}
        </View>
        {/* second row btns (blue and yellow) */}
        <View style={styles.btnPlayRow}>
          {renderSimonBtn(() => myPressFlash(3), styles.btnSingle, [
            styles.btnImage,
            {tintColor: blueBtn, transform: [{rotate: alignToLaguage.third}]},
          ])}
          {renderSimonBtn(() => myPressFlash(4), styles.btnSingle, [
            styles.btnImage,
            {tintColor: yellowBtn, transform: [{rotate: alignToLaguage.four}]},
          ])}
        </View>
      </View>
      <View style={styles.Play}>
        <TouchableOpacity
          onPress={() => startBtn()}
          style={styles.btn}>
          <LinearGradient
            colors={[color1, color2]}
            style={styles.linearGradient}>
            <Text style={styles.btnText}>START</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateResult()} style={styles.btn}>
          <LinearGradient
            colors={[color1, color2]}
            style={styles.linearGradient}>
            <Text style={styles.btnText}>SCORE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btnPlayRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSingle: {
    margin: 5,
  },
  statusShape: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: '#393956',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 6,
  },
  statusText: {
    fontSize: 19,
    color: 'white',
  },
  Play: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    direction: 'ltr',
  },
  btn: {
    width: '45%',
    height: 100,
    padding: 5,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  btnImage: {
    width: 100,
    height: 100,
  },
  fullScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SimonBoard;
