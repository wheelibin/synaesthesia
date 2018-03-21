import Tone from "tone";
import * as bass from "./bass";
import { Instrument } from "./instrument";

export class SimpleSine extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
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

    this.synth.send("reverb", -12);
  }
}

export class SoftSquareFm extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
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
    this.synth.volume.value = 10;

    const filter = new Tone.Filter(400, "lowpass").toMaster();
    this.synth.send("reverb", -12);
    this.synth.connect(filter);
  }
}

export const SwirlySawtoothChorusWithSubBass = function() {
  const chordSynth = new Tone.PolySynth(6, Tone.Synth);
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
  const filter = new Tone.Filter(250, "lowpass").toMaster();

  const lfo = new Tone.LFO("8m", 250, 1600);
  lfo.start();
  lfo.connect(filter.frequency);

  const chorus = new Tone.Chorus("1:0:0", 2.5, 1).toMaster();
  const reverb = new Tone.Freeverb().toMaster();

  const lfoReverbDampening = new Tone.LFO("8m", 400, 14000);
  lfoReverbDampening.phase = 90;
  lfoReverbDampening.start();
  lfoReverbDampening.connect(reverb.dampening);

  chordSynth.chain(chorus, reverb, filter);

  //Add bass for the root note
  const bassSynth = bass.subBass();
  bassSynth.volume.value = bassSynth.volume.value - 12;

  this.triggerAttackRelease = (chord, duration, time) => {
    const lowRootNote = Tone.Frequency(chord[0]).transpose(-12);
    chordSynth.triggerAttackRelease(chord, duration, time);
    bassSynth.triggerAttackRelease(lowRootNote, duration, time);
  };
};
