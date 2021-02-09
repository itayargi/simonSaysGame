import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIMONBTN} from '../../android/app/src/images';
import * as RNLocalize from 'react-native-localize';
import {useLinkProps} from '@react-navigation/native';
import {playSoundBtn} from './utils';
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const SimonBoard = (props) => {
  const [pressNotAllowed, setPressNotAllow] = useState(true);
  const [flashSimonBtn, setFlashSimonBtn] = useState('');
  const randomNumber = Math.floor(Math.random() * 4 + 1);
  const numberOfRounds = 3;
  const flashColor = 'white';
  const redColor = 'red';

  var redSimon = new SimonButton(1, 'red');
  var greenSimon = new SimonButton(2, 'green');
  var blueSimon = new SimonButton(3, 'blue');
  var yellowSimon = new SimonButton(4, 'yellow');
  flaseTime = 400;

  const [simonOption, setSimonOption] = useState({
    stage: [getRandomBtn()],
    index: 0,
    numOfTurnes: numberOfRounds,
  });
  const color1 = props.colors.btn1[0];
  const color2 = props.colors.btn1[1];
  function SimonButton(id, color) {
    this.id = id;
    this.color = color;
    this.playSound = function () {
      playSoundBtn(this.id - 1);
    };
  }

  function getRandomBtn() {
    const randomNumber = Math.floor(Math.random() * 3 + 0);
    const options = [redSimon, greenSimon, blueSimon, yellowSimon];
    return options[randomNumber];
  }

  const simonAction = (simonB = SimonButton) => {
    setFlashSimonBtn(simonB.color);
    wait(200).then(() => setFlashSimonBtn(''));
    simonB.playSound();
  };

  const startRound = (stage = []) => {
    if (simonOption.numOfTurnes == 1) {
      let newBtn = getRandomBtn();
      Alert.alert('Yeah we won!');
      setSimonOption({stage: [newBtn], index: 0, numOfTurnes: numberOfRounds});
      return;
    }
    setPressNotAllow(true);
    let i = 0;
    let intervalRound = setInterval(() => {
      //   finish round
      if (stage[i] == undefined) {
        clearInterval(intervalRound);
        setPressNotAllow(false);
      } else {
        simonAction(stage[i]);
      }
      i++;
    }, gameSpeed);
    setSimonOption({...simonOption, index: 0});
  };
  const myPlay = (btn = SimonButton) => {
    let newBtn = getRandomBtn();
    const indexToCheck = simonOption.index;
    const arrayOfOption = simonOption.stage;
    const lengthOfArray = arrayOfOption.length;
    // if mistake
    if (arrayOfOption[indexToCheck].id !== btn.id) {
      Alert.alert('Wrong number');
      setSimonOption({stage: [newBtn], index: 0, numOfTurnes: numberOfRounds});
    }
    // check and move index up
    else if (indexToCheck + 1 < lengthOfArray) {
      setSimonOption({...simonOption, index: simonOption.index + 1});
    }
    // if last number in array - check complete => add another random SimonButton
    else {
      setSimonOption({
        ...simonOption,
        index: 0,
        numOfTurnes: simonOption.numOfTurnes - 1,
        stage: [...simonOption.stage, newBtn],
      });
    }
  };

  //   align
  const hebrewAlign = {
    first: '90deg',
    sec: '0deg',
    third: '180deg',
    four: '270deg',
  };
  const englishAlign = {
    first: '0deg',
    sec: '90deg',
    third: '270deg',
    four: '180deg',
  };
  const device = RNLocalize.getLocales();
  const alignToLaguage =
    device && device[0].languageTag == 'he-IL' ? hebrewAlign : englishAlign;
  const gameSpeed = 1700;
  const userLevel = simonOption.stage.length;

  // navigate to ResultScreen
  const navigateResult = () => {
    props.navigation.navigate('ResultScreen');
  };

  const startBtn = () => {
    startRound(simonOption.stage);
  };
  useEffect(() => {
    if (simonOption.stage.length > 1) {
      startRound(simonOption.stage);
    }
  }, [simonOption.stage]);

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
          {renderSimonBtn(() => myPlay(redSimon), styles.btnSingle, [
            styles.btnImage,

            {
              tintColor:
                flashSimonBtn == redSimon.color ? 'white' : redSimon.color,
              transform: [{rotate: alignToLaguage.first}],
            },
          ])}
          {renderSimonBtn(() => myPlay(greenSimon), styles.btnSingle, [
            styles.btnImage,
            {
              tintColor:
                flashSimonBtn == greenSimon.color ? 'white' : greenSimon.color,
              transform: [{rotate: alignToLaguage.sec}],
            },
          ])}
        </View>
        {/* second row btns (blue and yellow) */}
        <View style={styles.btnPlayRow}>
          {renderSimonBtn(() => myPlay(blueSimon), styles.btnSingle, [
            styles.btnImage,
            {
              tintColor:
                flashSimonBtn == blueSimon.color ? 'white' : blueSimon.color,
              transform: [{rotate: alignToLaguage.third}],
            },
          ])}
          {renderSimonBtn(() => myPlay(yellowSimon), styles.btnSingle, [
            styles.btnImage,
            {
              tintColor:
                flashSimonBtn == yellowSimon.color
                  ? 'white'
                  : yellowSimon.color,
              transform: [{rotate: alignToLaguage.four}],
            },
          ])}
        </View>
      </View>
      <View style={styles.Play}>
        <TouchableOpacity onPress={() => startBtn()} style={styles.btn}>
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
