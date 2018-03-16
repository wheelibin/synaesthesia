import Tone from "tone";
import * as parts from "./parts";

export const play = () => {
  var reverb = new Tone.Freeverb().toMaster();

  parts.addBass();
  parts.addChords(reverb);
  parts.addMelody(reverb);

  Tone.Master.volume.value = -32;
  Tone.Transport.start();
  Tone.Transport.stop(30);
};
