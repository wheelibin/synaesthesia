import Tone from "tone";
import * as parts from "./parts";

export const play = () => {
  //parts.addBass();
  parts.addChords();
  //parts.addMelody(reverb);

  Tone.Master.volume.value = -32;
  Tone.Transport.start();
  Tone.Transport.stop(30);
};
