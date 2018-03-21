import Tone from "tone";
import { Instrument } from "./instrument";

export class KickDrum extends Instrument {
  constructor() {
    super(new Tone.MembraneSynth({ pitchDecay: 0.1 }), 26);
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

export class OpenHat extends Instrument {
  constructor(frequency) {
    super(
      new Tone.MetalSynth({
        frequency: frequency
      }),
      10
    );
  }
}

export class Shaker extends Instrument {
  constructor(frequency) {
    super(
      new Tone.MetalSynth({
        frequency: frequency,
        //harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 6000,
        octaves: 2.5
      }),
      16
    );
    const reverb = new Tone.Freeverb().toMaster();
    this.synth.connect(reverb);
  }
}

export class DampenedOpenHat extends Instrument {
  constructor(frequency) {
    super(
      new Tone.MetalSynth({
        frequency: frequency,
        //harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 1000,
        octaves: 1.5
      }),
      16
    );
  }
}

export class Test extends Instrument {
  constructor() {
    super(new Tone.MetalSynth({ frequency: 200 }), 16);
  }
}
