import Tone from "tone";
import * as keys from "./keys";
import * as scales from "./scales";
import * as utils from "../utils";
import * as instruments from "./instruments";

export const addChords = () => {
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
      [1, 3, 5]
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

  // const chordProgression = [
  //   Tone.Frequency(
  //     chordKey[utils.randomIntBetween(0, chordKey.length - 1)]
  //   ).harmonize([0, 3, 6]),
  //   Tone.Frequency(
  //     chordKey[utils.randomIntBetween(0, chordKey.length - 1)]
  //   ).harmonize([0, 2, 4]),
  //   Tone.Frequency(
  //     chordKey[utils.randomIntBetween(0, chordKey.length - 1)]
  //   ).harmonize([0, 2, 4]),
  //   Tone.Frequency(
  //     chordKey[utils.randomIntBetween(0, chordKey.length - 1)]
  //   ).harmonize([0, 3, 5])
  // ];

  const chordSynth = instruments.pad();
  const bassSynth = instruments.softSquareBass();
  bassSynth.volume.value = bassSynth.volume.value - 8;

  var loop = new Tone.Loop(function(time) {
    //Take first chord
    var currentChord = chordProgression.shift();
    //add chord to back of queue
    chordProgression.push(currentChord);
    //play it
    chordSynth.triggerAttackRelease(currentChord, "4m");
    //Add bass for the root note
    const lowRootNote = Tone.Frequency(currentChord[0]).transpose(-24);
    bassSynth.triggerAttackRelease(lowRootNote, "3:3:2");
  }, "4m");
  loop.start();
};

export const addBass = () => {
  const bassKey = keys.keyFromTonicAndScale("D", scales.scales.dorian, 1, 1);

  const bassSynth = instruments.softSquareBass();

  const numberOfSteps = 8;
  const sequence = [];
  for (let i = 0; i < numberOfSteps - sequence.length; i++) {
    const notesInStep = utils.randomIntBetween(1, 2);
    const step = [];
    for (let i = 0; i < notesInStep; i++) {
      step.push(bassKey[utils.randomIntBetween(0, bassKey.length - 1)]);
    }
    sequence.push(step);
  }

  const sequencer = new Tone.Sequence(function(time, note) {
    bassSynth.triggerAttackRelease(note, "4n");
  }, sequence);
  sequencer.probability = 0.4;
  sequencer.start();
};

export const addMelody = reverb => {
  var melodySynth = new Tone.Synth({
    oscillator: {
      type: "square4"
    }
    // envelope: {
    //   attack: 0.1,
    //   decay: 0.2,
    //   sustain: 0.9,
    //   release: 3
    // }
  }).connect(reverb);
  melodySynth.volume.value = 2;

  const melodyKey = keys.keyFromTonicAndScale(
    "D",
    scales.scales.minorPentatonic,
    4,
    5
  );

  const getMelodyNote = () => {
    return melodyKey[utils.randomIntBetween(0, melodyKey.length - 1)];
  };

  const numberOfSteps = 4;
  const sequence = [];
  for (let i = 0; i < numberOfSteps; i++) {
    const notesInStep = utils.randomIntBetween(1, 2);
    const step = [];
    for (let i = 0; i < notesInStep; i++) {
      step.push(getMelodyNote());
    }
    sequence.push(step);
  }

  const melodySequencer = new Tone.Sequence(function(time, note) {
    var vel = Math.random() * 0.5 + 0.5;
    melodySynth.triggerAttackRelease(note, "4n", time, vel);
  }, sequence);

  melodySequencer.probability = 0.2;
  melodySequencer.start();
};
