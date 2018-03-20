import Tone from "tone";
import * as song from "./song";
import * as constants from "./constants";
import * as utils from "../utils";

export const play = () => {
  Tone.context.close();
  Tone.context = new AudioContext();

  const generatedSettings = song.play();

  const bpm = utils.randomIntBetween(70, 130);
  generatedSettings.bpm = bpm;

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start(constants.almostImmediately);
  //Tone.Transport.stop(60);

  return generatedSettings;
};
