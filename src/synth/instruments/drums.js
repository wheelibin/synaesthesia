import Tone from "tone";
import { Instrument } from "./instrument";

export class KickDrum extends Instrument {
  constructor() {
    super(new Tone.MembraneSynth({ pitchDecay: 0.1 }), 28);
    var comp = new Tone.Compressor(-30, 12).toMaster();
    this.synth.connect(comp);
  }
}
export class HiHat extends Instrument {
  constructor(addReverb) {
    super(new Tone.NoiseSynth(), 16);
    if (addReverb) {
      this.synth.send("reverb", -12);
    }
    const filter = new Tone.Filter(8000, "highpass").toMaster();
    this.synth.connect(filter);
  }
}

export class Slap extends Instrument {
  constructor(addReverb) {
    super(
      new Tone.NoiseSynth({
        noise: {
          type: "white",
          playbackRate: 5
        },
        envelope: {
          attack: 0.001,
          decay: 0.3,
          sustain: 0,
          release: 0.3
        }
      }),
      14
    );
    if (addReverb) {
      this.synth.send("reverb", -12);
    }

    const filter = new Tone.Filter(500, "lowpass").toMaster();
    this.synth.connect(filter);
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
        envelope: {
          attack: 0.1,
          decay: 0.4,
          release: 0.3
        },
        frequency: frequency,
        //harmonicity: 5.1,
        modulationIndex: 64,
        resonance: 3000,
        octaves: 1.5
      }),
      5
    );
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
      8
    );
  }
}

export class Test extends Instrument {
  constructor() {
    super(new Tone.MetalSynth({ frequency: 200 }), 16);
  }
}
