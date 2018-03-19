import Tone from "tone";

export const subBass = () => {
  return squareBass(2);
};

export const softSquareBass = () => {
  return squareBass(6);
};

export const fastAttackBass = () => {
  const bassSynth = new Tone.Synth({
    oscillator: {
      type: "square4"
    },
    envelope: {
      attack: 0.02,
      decay: 0,
      sustain: 1,
      release: 1
    }
  }).toMaster();
  bassSynth.volume.value = 24;
  return bassSynth;
};

export const pad = () => {
  const chordSynth = new Tone.PolySynth(6, Tone.Synth);
  chordSynth.set({
    oscillator: {
      type: "fatsawtooth"
    },
    envelope: {
      attack: "0:4",
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

  const lfoLfo = new Tone.LFO("7m", 0.5, 1);
  lfoLfo.start();
  lfoLfo.connect(lfo.amplitude);

  const chorus = new Tone.Chorus(1, 2.5, 0.5).toMaster();
  const reverb = new Tone.Freeverb().toMaster();

  chordSynth.chain(filter, reverb, chorus);
  return chordSynth;
};

export const squareBass = harmonics => {
  const bassSynth = new Tone.Synth({
    oscillator: {
      type: "square" + harmonics
    },
    envelope: {
      attack: "0:2",
      decay: 0.1,
      sustain: 1,
      release: 3
    }
  }).toMaster();
  bassSynth.volume.value = 24;
  return bassSynth;
};
