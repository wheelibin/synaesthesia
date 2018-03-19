import Tone from "tone";
import * as song from "./song";

export const play = () => {
  song.play();

  Tone.Master.volume.value = -32;
  Tone.Transport.bpm.value = 80;
  Tone.Transport.start();
  //Tone.Transport.stop(60);
};
