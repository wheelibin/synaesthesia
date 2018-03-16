import Tone from "tone";
import * as utils from "../utils";
import * as scales from "./scales";
import * as keys from "./keys";

export const play = () => {
  var reverb = new Tone.Freeverb().toMaster();

  var melodySynth = new Tone.Synth({
    oscillator: {
      type: "sine",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 0.2,
      decay: 0.2,
      sustain: 0.9,
      release: 3
    }
  }).connect(reverb);
  melodySynth.volume.value = -2;

  const melodyKey = keys.keyFromTonicAndScale("A", scales.scales.major, 3, 4);

  const getMelodyNote = () => {
    return melodyKey[utils.randomIntBetween(0, melodyKey.length)];
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
    //var vel = Math.random() * 0.5 + 0.5;
    melodySynth.triggerAttackRelease(note);
  }, sequence);

  const chordKey = keys.keyFromTonicAndScale(
    "Bb",
    scales.scales.harmonicMinor,
    3,
    3
  );

  const chordProgression = [
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length)],
      scales.scales.harmonicMinor,
      [1, 3, 5]
    ),
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length)],
      scales.scales.harmonicMinor,
      [1, 4, 6]
    ),
    scales.chordFromScale(
      chordKey[utils.randomIntBetween(0, chordKey.length)],
      scales.scales.harmonicMinor,
      [1, 3, 5]
    )
  ];

  const chordSynth = new Tone.PolySynth(6, Tone.Synth).connect(reverb);
  chordSynth.volume.value = 10;
  chordSynth.set({
    oscillator: {
      type: "triangle",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 1,
      decay: 0.1,
      sustain: 0.9,
      release: 3
    }
  });

  var part = new Tone.Part(
    function(time, note) {
      //the notes given as the second element in the array
      //will be passed in as the second argument
      chordSynth.triggerAttackRelease(note, "4n", time);
    },
    [
      [0, chordProgression[0]],
      ["0:2", chordProgression[1]],
      ["0:3:2", chordProgression[2]]
    ]
  );
  part.playbackRate = 0.5;
  part.loop = true;
  part.start();

  //Bass
  const bassKey = keys.keyFromTonicAndScale(
    "Bb",
    scales.scales.harmonicMinor,
    1,
    1
  );

  const bassNotes = [
    bassKey[utils.randomIntBetween(0, bassKey.length - 1)],
    bassKey[utils.randomIntBetween(0, bassKey.length - 1)],
    bassKey[utils.randomIntBetween(0, bassKey.length - 1)],
    bassKey[utils.randomIntBetween(0, bassKey.length - 1)]
  ];

  var bassSynth = new Tone.Synth({
    oscillator: {
      type: "triangle"
    },
    envelope: {
      attack: 0.2,
      decay: 0.2,
      sustain: 0.9,
      release: 3
    }
  }).toMaster();
  bassSynth.volume.value = 20;

  const bassPattern = new Tone.Pattern(
    function(time, note) {
      bassSynth.triggerAttackRelease(note);
    },
    bassNotes,
    "upDown"
  );

  //bassPattern.humanize = true;
  //pattern.probability = 0.8;
  bassPattern.interval = "2m";
  bassPattern.start();

  melodySequencer.probability = 0.8;
  melodySequencer.start();

  Tone.Master.volume.value = -32;
  Tone.Transport.start();
  //Tone.Transport.stop(10);
};
