import Tone from "tone";
import * as utils from "../utils";
import * as scales from "./scales";

export const play = () => {
  var reverb = new Tone.Freeverb().toMaster();

  var synth = new Tone.Synth({
    oscillator: {
      type: "pwm",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 3,
      decay: 0.2,
      sustain: 0.9,
      release: 3
    }
  }).connect(reverb);

  //const scale = scales.dHarmonicMinor(1, 6);
  const scale = scales.dMajor(3, 4);

  const getScaleNote = () => {
    return scale[utils.randomIntBetween(0, scale.length)];
  };

  const numberOfSteps = 4;
  const sequence = [];
  for (let i = 0; i < numberOfSteps; i++) {
    const notesInStep = utils.randomIntBetween(1, 3);
    const step = [];
    for (let i = 0; i < notesInStep; i++) {
      step.push(getScaleNote());
    }
    sequence.push(step);
  }

  const seq = new Tone.Sequence(function(time, note) {
    const vel = 1 - Math.random() + 1;
    synth.triggerAttackRelease(note, 5, 0, vel);
  }, sequence);

  seq.start(0);

  Tone.Master.volume.value = -32;
  Tone.Transport.start();
  Tone.Transport.stop(10);
};

//const patternNotes = [getScaleNote()];

//   const pattern = new Tone.Pattern(function(time, note) {
//     synth.triggerAttackRelease(note, 5);
//     pattern.values = [getScaleNote()];
//   }, patternNotes);

//   const pattern = new Tone.Pattern(
//     (time, note) => {
//       synth.triggerAttackRelease(note, 5);
//     },
//     dHarmonicMinor,
//     "random"
//   );
//   //pattern.humanize = true;
//   //pattern.probability = 0.8;
//   pattern.playbackRate = 0.5;
//   pattern.start(0);
