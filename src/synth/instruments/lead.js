import Tone from "tone";
import { Instrument } from "./instrument";

export class SimpleSine extends Instrument {
  constructor() {
    super(
      new Tone.Synth({
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.02,
          decay: 0,
          sustain: 1,
          release: 1
        }
      }),
      18
    );
  }
}
