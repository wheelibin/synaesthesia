import Tone from "tone";
import { Instrument } from "./instrument";

export class KickDrum extends Instrument {
  constructor() {
    super(new Tone.MembraneSynth(), 24);
  }
}
export class HiHat extends Instrument {
  constructor(addReverb) {
    super(new Tone.NoiseSynth(), 16);
    if (addReverb) {
      const reverb = new Tone.Freeverb().toMaster();
      this.synth.connect(reverb);
    }
  }
}
