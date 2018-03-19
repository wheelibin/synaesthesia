import Tone from "tone";
import * as keys from "./keys";
import * as scales from "./scales";
import * as utils from "../utils";
import instruments from "./instruments";

export const addChords = chordProgression => {
  const chordSynth = new instruments.Pad();

  var chordLoop = new Tone.Loop(function(time) {
    //Take first chord
    var currentChord = chordProgression.shift();
    //add chord to back of queue
    chordProgression.push(currentChord);
    //play it
    chordSynth.triggerAttackRelease(currentChord, "8m", time);
  }, "8m");
  chordLoop.start();
};

export const addDrums = key => {
  const synth = new Tone.MembraneSynth().toMaster();
  synth.volume.value = 24;
  const loop = new Tone.Loop(function(time) {
    synth.triggerAttackRelease(key.root + "0", "16n", time);
  }, "4n");
  loop.start();

  const noiseSynth = new Tone.NoiseSynth().toMaster();
  noiseSynth.volume.value = 16;
  const snareLoop = new Tone.Loop(function(time) {
    noiseSynth.triggerAttackRelease("16n", time);
  }, "0:2:0");
  snareLoop.start("0:1:0");
};

export const addBass = (key, chordProgression) => {
  const sequence = [];
  const numberOfSteps = 4;

  for (const chord of chordProgression) {
    const chordRoot = Tone.Frequency(chord[0]).transpose(-12);
    const possibleNotesForCurrentChord = scales.actualNotesFromScale(
      key.root,
      key.type,
      1,
      1
    );

    for (let i = 0; i < numberOfSteps; i++) {
      const notesInStep = utils.randomIntBetween(1, 4);
      //Start on chord root
      const step = [chordRoot];
      //Random sequence for the rest of the notes
      for (let i = 1; i < notesInStep; i++) {
        const stepNote =
          possibleNotesForCurrentChord[
            utils.randomIntBetween(0, possibleNotesForCurrentChord.length - 1)
          ];
        step.push(stepNote);
      }

      sequence.push(step);
    }
  }

  const bassSynth = instruments.bass.fastAttackBass();
  bassSynth.volume.value = bassSynth.volume.value - 10;
  const sequencer = new Tone.Sequence(
    function(time, note) {
      bassSynth.triggerAttackRelease(note, "8n", time);
    },
    sequence,
    "1m"
  );

  //sequencer.probability = 0.8;
  //sequencer.playbackRate = 0.25;
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
