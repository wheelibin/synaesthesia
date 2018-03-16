import Tone from "tone";
import * as keys from "./keys";
import * as scales from "./scales";
import * as utils from "../utils";

export const addBass = () => {
  const bassKey = keys.keyFromTonicAndScale("D", scales.scales.dorian, 1, 1);

  var bassSynth = new Tone.Synth({
    oscillator: {
      type: "square5"
    },
    envelope: {
      attack: 0.2,
      decay: 0.2,
      sustain: 0.9,
      release: 3
    }
  }).toMaster();
  bassSynth.volume.value = 24;

  const numberOfSteps = 4;
  const sequence = [];
  for (let i = 0; i < numberOfSteps; i++) {
    const notesInStep = utils.randomIntBetween(1, 3);
    const step = [];
    for (let i = 0; i < notesInStep; i++) {
      step.push(bassKey[utils.randomIntBetween(0, bassKey.length - 1)]);
    }
    sequence.push(step);
  }

  const sequencer = new Tone.Sequence(function(time, note) {
    bassSynth.triggerAttackRelease(note, "4n");
  }, sequence);
  sequencer.start();
};

export const addMelody = reverb => {
  var melodySynth = new Tone.Synth({
    oscillator: {
      type: "square8"
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 3
    }
  }).connect(reverb);
  melodySynth.volume.value = 10;

  const melodyKey = keys.keyFromTonicAndScale("D", scales.scales.dorian, 4, 5);

  const getMelodyNote = () => {
    return melodyKey[utils.randomIntBetween(0, melodyKey.length - 1)];
  };

  const numberOfSteps = 8;
  const sequence = [];
  for (let i = 0; i < numberOfSteps; i++) {
    const notesInStep = utils.randomIntBetween(1, 3);
    const step = [];
    for (let i = 0; i < notesInStep; i++) {
      step.push(getMelodyNote());
    }
    sequence.push(step);
  }

  const melodySequencer = new Tone.Sequence(function(time, note) {
    var vel = Math.random() * 0.5 + 0.5;
    melodySynth.triggerAttackRelease(note, "8n", time, vel);
  }, sequence);

  melodySequencer.probability = 0.2;
  melodySequencer.start();
};

export const addChords = reverb => {
  const chordKey = keys.keyFromTonicAndScale("D", scales.scales.dorian, 3, 3);

  const chordProgression = [
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length - 1)],
      scales.scales.major,
      [1, 4, 7]
    ),
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length - 1)],
      scales.scales.major,
      [1, 4, 7]
    ),
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length - 1)],
      scales.scales.major,
      [1, 3, 5]
    ),
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length - 1)],
      scales.scales.major,
      [1, 4, 6]
    )
  ];

  const chorus = new Tone.Chorus(1, 2.5, 0.5).toMaster();
  const chordSynth = new Tone.PolySynth(6, Tone.Synth);

  chordSynth.connect(reverb);
  chordSynth.connect(chorus);

  chordSynth.volume.value = 10;
  chordSynth.set({
    oscillator: {
      type: "triangle",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: "0:2",
      decay: 0.1,
      sustain: 1,
      release: 0.1
    }
  });

  const noteLength = "2m";

  const pattern = new Tone.Pattern(function(time, note) {
    chordSynth.triggerAttackRelease(note, noteLength);
  }, chordProgression);
  pattern.interval = noteLength;
  pattern.start();
};
