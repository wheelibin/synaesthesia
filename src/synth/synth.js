import debounce from "lodash/debounce";
import Tone from "tone";
import songs from "./songs";
import * as utils from "../utils";

export const play = (seed, callback = null) => {
  Tone.context.close();
  Tone.context = new AudioContext();

  Math.seedrandom(seed);

  const reverb = new Tone.Freeverb().toMaster();
  reverb.receive("reverb");

  //const generatedSettings = songs.funkyDownTempo.play();
  const generatedSettings = songs.drone.play();

  const bpm = utils.randomIntBetween(70, 90);
  generatedSettings.bpm = bpm;

  const swing = Math.random();
  generatedSettings.swing = swing;

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.swing = swing;

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
