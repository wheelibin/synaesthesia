import Tone from "tone";
import { Instrument } from "./instrument";

export class KickDrum extends Instrument {
  constructor() {
    super(new Tone.MembraneSynth(), 24);
  }
}
export class HiHat extends Instrument {
  constructor() {
    super(new Tone.NoiseSynth(), 16);
  }
}
