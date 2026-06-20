import { PolySynth, Synth, Filter, Chorus, Freeverb, Frequency, LFO } from "tone";
import * as bass from "./bass";
import { Instrument } from "./instrument";
import { sendToReverb } from "../effects.js";

export class SimpleSine extends Instrument {
  constructor(volume = 24) {
    super(new PolySynth(Synth), volume);
    this.synth.set({
      oscillator: {
        type: "fatsine"
      },
      envelope: {
        attack: 0.2,
        decay: 0.1,
        sustain: 1,
        release: 1
      },
      portamento: 0.2
    });
    this.synth.volume.value = 10;
    sendToReverb(this.synth, -12);
  }
}

export class SoftSquareFm extends Instrument {
  constructor(volume = 24) {
    super(new PolySynth(Synth), volume);
    this.synth.set({
      oscillator: {
        type: "fmsquare2"
      },
      envelope: {
        attack: 0.2,
        decay: 0.1,
        sustain: 1,
        release: 1
      },
      portamento: 0
    });
    this.synth.volume.value = 8;

    const filter = new Filter(400, "lowpass").toDestination();
    sendToReverb(this.synth, -12);
    this.synth.connect(filter);
  }
}

export const SwirlySawtoothChorusWithSubBass = function() {
  const chordSynth = new PolySynth(Synth);
  chordSynth.set({
    oscillator: {
      type: "fatsawtooth"
    },
    envelope: {
      attack: 0.2,
      decay: 0.1,
      sustain: 1,
      release: 1
    },
    portamento: 0.2
  });
  const filter = new Filter(250, "lowpass").toDestination();

  const lfo = new LFO("8m", 250, 1600);
  lfo.start();
  lfo.connect(filter.frequency);

  const chorus = new Chorus("1:0:0", 2.5, 1).toDestination();
  const reverb = new Freeverb().toDestination();

  chordSynth.chain(chorus, reverb, filter);

  const bassSynth = bass.subBass();
  bassSynth.volume.value = bassSynth.volume.value - 12;

  this.triggerAttackRelease = (chord, duration, time) => {
    const lowRootNote = Frequency(chord[0]).transpose(-12);
    chordSynth.triggerAttackRelease(chord, duration, time);
    bassSynth.triggerAttackRelease(lowRootNote, duration, time);
  };
};
