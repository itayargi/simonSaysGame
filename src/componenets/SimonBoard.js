import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIMONBTN} from '../../android/app/src/images';
import * as RNLocalize from 'react-native-localize';
import { useLinkProps } from '@react-navigation/native';

const SimonBoard = (props) => {
  const [index, setIndex] = useState(0);
  const [pressNotAllowed, setPressNotAllow] = useState(false);
  const [redBtn, setRedBtn] = useState('red');
  const [greenBtn, setGreenBtn] = useState('green');
  const [blueBtn, setBlueBtn] = useState('blue');
  const [yellowBtn, setYellowBtn] = useState('yellow');
  const randomNumber = Math.floor(Math.random() * 4 + 1);

  const color1 = '#50d2c2';
  const color2 = '#3333a3';

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
 
//   comp press
const computerTurnPress=()=>{

}
// navigate to ResultScreen
const navigateResult=()=>{
props.navigation.navigate('ResultScreen')
}


  // my click
  const myPressFlash = (num) => {};

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
            <Text style={[styles.statusText]}>{1}</Text>
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
          onPress={() => computerTurnPress()}
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
