import Tone from "tone";

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

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const dHarmonicMinor = [];
  for (let octave = 1; octave < 4; octave++) {
    dHarmonicMinor.push("D" + octave);
    dHarmonicMinor.push("E" + octave);
    dHarmonicMinor.push("F" + octave);
    dHarmonicMinor.push("G" + octave);
    dHarmonicMinor.push("A" + octave);
    dHarmonicMinor.push("Bb" + octave);
    dHarmonicMinor.push("C#" + octave);
  }

  const getScaleNote = () => {
    return dHarmonicMinor[randomIntFromInterval(0, dHarmonicMinor.length)];
  };

  const patternNotes = [getScaleNote()];

  const pattern = new Tone.Pattern(function(time, note) {
    synth.triggerAttackRelease(note, 5);
    pattern.values = [getScaleNote()];
  }, patternNotes);
  //pattern.humanize = true;
  //pattern.probability = 0.8;
  pattern.playbackRate = 0.5;
  pattern.start(0);
  Tone.Transport.start();
};
