import Tone from "tone";
import * as song from "./song";
import * as constants from "./constants";

export const play = () => {
  Tone.context.close();
  Tone.context = new AudioContext();

  const generatedSettings = song.play();

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = 80;
  Tone.Transport.start(constants.almostImmediately);
  //Tone.Transport.stop(60);

  return generatedSettings;
};
