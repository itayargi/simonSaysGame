var Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

const audioLength = 600;

export const playSoundBtn = (file) => {
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
        wait(audioLength).then(() => {
          whoosh.stop(() => {
            // whoosh.play();
          });
        });
      });
}
    
    // Release the audio player resource
    whoosh.release();
  };