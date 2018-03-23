import Tone from "tone";
import * as song from "./song";
import * as utils from "../utils";

export const play = seed => {
  Tone.context.close();
  Tone.context = new AudioContext();

  Math.seedrandom(seed);

  const reverb = new Tone.Freeverb().toMaster();
  reverb.receive("reverb");

  const generatedSettings = song.play();

  const bpm = utils.randomIntBetween(70, 90);
  generatedSettings.bpm = bpm;

  const swing = Math.random();
  generatedSettings.swing = swing;

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.swing = swing;
  Tone.Transport.start(1);

  return generatedSettings;
};

export const stop = () => {
  Tone.context.close();
};
