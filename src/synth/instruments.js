import Tone from "tone";

export const softSquareBass = () => {
  const bassSynth = new Tone.Synth({
    oscillator: {
      type: "square6"
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
    }
  });
  const filter = new Tone.Filter(250, "lowpass").toMaster();
  const lfo = new Tone.LFO("8m", 250, 1200);
  lfo.start();
  lfo.connect(filter.frequency);

  const chorus = new Tone.Chorus(1, 2.5, 0.5).toMaster();
  const reverb = new Tone.Freeverb().toMaster();

  chordSynth.chain(filter, reverb, chorus);
  return chordSynth;
};
