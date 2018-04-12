import debounce from "lodash/debounce";
import Tone from "tone";
import songs from "./songs";

export const play = (song, seed, callback = null) => {
  Tone.context.close();
  Tone.context = new AudioContext();

  Math.seedrandom(seed);

  let generatedSettings = null;
  if (song === 1) {
    generatedSettings = songs.funkyDownTempo.play();
  } else {
    generatedSettings = songs.drone.play();
  }

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = generatedSettings.bpm;
  Tone.Transport.swing = generatedSettings.swing;

  Tone.Transport.start(1);
  console.log(generatedSettings);

  if (callback) {
    callback(generatedSettings);
  }

  return generatedSettings;
};

export const stop = () => {
  Tone.context.close();
};

export const playDebounced = debounce(play, 400);
