import { MembraneSynth, NoiseSynth, Filter, MetalSynth, Compressor } from "tone";
import { Instrument } from "./instrument";
import { sendToReverb } from "../effects.js";

export class KickDrum extends Instrument {
  constructor() {
    super(new MembraneSynth({ pitchDecay: 0.1 }), 28);
    var comp = new Compressor(-30, 12).toDestination();
    this.synth.connect(comp);
  }
}

export class HiHat extends Instrument {
  constructor(addReverb) {
    super(new NoiseSynth(), 16);
    if (addReverb) {
      sendToReverb(this.synth, -12);
    }
    const filter = new Filter(8000, "highpass").toDestination();
    this.synth.connect(filter);
  }
}

export class Slap extends Instrument {
  constructor(addReverb) {
    super(
      new NoiseSynth({
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
      sendToReverb(this.synth, -12);
    }

    const filter = new Filter(500, "lowpass").toDestination();
    this.synth.connect(filter);
  }
}

export class OpenHat extends Instrument {
  constructor(frequency) {
    super(
      new MetalSynth({
        frequency: frequency
      }),
      10
    );
  }
}

export class Shaker extends Instrument {
  constructor(frequency) {
    super(
      new MetalSynth({
        envelope: {
          attack: 0.1,
          decay: 0.4,
          release: 0.3
        },
        frequency: frequency,
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
      new MetalSynth({
        frequency: frequency,
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
    super(new MetalSynth({ frequency: 200 }), 16);
  }
}
