import Tone from "tone";
import * as song from "./song";
import * as utils from "../utils";

export const play = () => {
  Tone.context.close();
  Tone.context = new AudioContext();
  //Tone.context.latencyHint = "playback";

  const reverb = new Tone.Freeverb().toMaster();
  reverb.receive("reverb");

  const generatedSettings = song.play();

  const bpm = utils.randomIntBetween(70, 90);
  generatedSettings.bpm = bpm;

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start(1);
  //Tone.Transport.stop(60);

  return generatedSettings;
};

export const stop = () => {
  Tone.context.close();
};
