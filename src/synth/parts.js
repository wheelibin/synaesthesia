import Tone from "tone";
// import * as keys from "./keys";
// import * as scales from "./scales";
// import * as utils from "../utils";
// import instruments from "./instruments";

export const addChordProgression = (startTime, chordProgression, instrument, noteLength, interval, shouldLoop) => {
  const loop = new Tone.Loop(function(time) {
    //Take first chord
    const currentChord = chordProgression.shift();
    //add chord to back of queue
    chordProgression.push(currentChord);
    //play it
    instrument.triggerAttackRelease(currentChord, noteLength, time);
  }, interval);

  loop.loop = shouldLoop;
  loop.start(startTime);
};

export const addDrums = (startTime, note, instrument, pattern, probability, shouldLoop) => {
  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        instrument.triggerAttackRelease(note, "16n", time);
      }
    },
    pattern,
    "16n"
  );
  sequencer.probability = probability;
  sequencer.loop = shouldLoop;
  sequencer.start(startTime);
};

export const addSoloPart = (startTime, notes, instrument, noteLength, pattern, shouldLoop) => {
  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        const note = notes.shift();
        notes.push(note);
        instrument.triggerAttackRelease(note, noteLength, time);
      }
    },
    pattern,
    "16n"
  );

  sequencer.loop = shouldLoop;
  sequencer.start(startTime);
};

export const addRepeatingSoloPart = (startTime, notes, instrument, noteLength, patterns, repeatTimes, shouldLoop) => {
  const expandedSequence = [];
  for (const section of notes) {
    for (let ri = 0; ri < repeatTimes; ri++) {
      for (let ni = 0; ni < section.length; ni++) {
        const note = section[ni];
        expandedSequence.push(note);
      }
    }
  }

  const expandedPattern = [];
  for (const section of patterns) {
    for (let ri = 0; ri < repeatTimes; ri++) {
      for (let ni = 0; ni < section.length; ni++) {
        const rythym = section[ni];
        expandedPattern.push(rythym);
      }
    }
  }

  const sequencer = new Tone.Sequence(
    function(time, hit) {
      if (hit === 1) {
        const note = expandedSequence.shift();
        expandedSequence.push(note);
        instrument.triggerAttackRelease(note, noteLength, time);
      }
    },
    expandedPattern,
    "16n"
  );

  sequencer.loop = shouldLoop;
  sequencer.start(startTime);
};

// export const addDrums = (startTime, note, instrument, interval, shouldLoop) => {
//   const loop = new Tone.Loop(function(time) {
//     instrument.triggerAttackRelease(note, "16n", time);
//   }, interval);
//   loop.loop = shouldLoop;
//   loop.start(startTime);
// };

// export const addBass = (key, chordProgression) => {
//   const sequence = [];
//   const numberOfSteps = 4;

//   for (const chord of chordProgression) {
//     const chordRoot = Tone.Frequency(chord[0]).transpose(-12);
//     const possibleNotesForCurrentChord = scales.actualNotesFromScale(
//       key.root,
//       key.type,
//       1,
//       1
//     );

//     for (let i = 0; i < numberOfSteps; i++) {
//       const notesInStep = utils.randomIntBetween(1, 4);
//       //Start on chord root
//       const step = [chordRoot];
//       //Random sequence for the rest of the notes
//       for (let i = 1; i < notesInStep; i++) {
//         const stepNote =
//           possibleNotesForCurrentChord[
//             utils.randomIntBetween(0, possibleNotesForCurrentChord.length - 1)
//           ];
//         step.push(stepNote);
//       }

//       sequence.push(step);
//     }
//   }

//   const bassSynth = instruments.bass.fastAttackBass();
//   bassSynth.volume.value = bassSynth.volume.value - 10;
//   const sequencer = new Tone.Sequence(
//     function(time, note) {
//       bassSynth.triggerAttackRelease(note, "8n", time);
//     },
//     sequence,
//     "1m"
//   );

//   //sequencer.probability = 0.8;
//   //sequencer.playbackRate = 0.25;
//   sequencer.start();
// };

// export const addMelody = reverb => {
//   var melodySynth = new Tone.Synth({
//     oscillator: {
//       type: "square4"
//     }
//     // envelope: {
//     //   attack: 0.1,
//     //   decay: 0.2,
//     //   sustain: 0.9,
//     //   release: 3
//     // }
//   }).connect(reverb);
//   melodySynth.volume.value = 2;

//   const melodyKey = keys.keyFromTonicAndScale(
//     "D",
//     scales.scales.minorPentatonic,
//     4,
//     5
//   );

//   const getMelodyNote = () => {
//     return melodyKey[utils.randomIntBetween(0, melodyKey.length - 1)];
//   };

//   const numberOfSteps = 4;
//   const sequence = [];
//   for (let i = 0; i < numberOfSteps; i++) {
//     const notesInStep = utils.randomIntBetween(1, 2);
//     const step = [];
//     for (let i = 0; i < notesInStep; i++) {
//       step.push(getMelodyNote());
//     }
//     sequence.push(step);
//   }

//   const melodySequencer = new Tone.Sequence(function(time, note) {
//     var vel = Math.random() * 0.5 + 0.5;
//     melodySynth.triggerAttackRelease(note, "4n", time, vel);
//   }, sequence);

//   melodySequencer.probability = 0.2;
//   melodySequencer.start();
// };
