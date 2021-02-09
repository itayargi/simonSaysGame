var Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const filesList =[ 
    'dosoundtwo.mp3', 'resound.m4a','misound.m4a','fasound.m4a',
  ]

export const playSoundBtn = (num) => {
    const file = filesList[num];
    console.log(('file', file));
if (file !== undefined){
    var whoosh = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        whoosh.setVolume(1);
        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        whoosh.setCurrentTime(0.2);
        // Get the current playback point in seconds
        wait(1000).then(() => {
          whoosh.stop(() => {
            // whoosh.play();
          });
        });
      });
}
    
    // Release the audio player resource
    whoosh.release();
  };