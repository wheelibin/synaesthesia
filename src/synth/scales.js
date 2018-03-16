import Tone from "tone";

export const scales = {
  major: [2, 2, 1, 2, 2, 2],
  naturalMinor: [2, 1, 2, 2, 1, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3],
  melodicMinor: [2, 1, 2, 2, 2, 2],
  dorian: [2, 1, 2, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1],
  ahavaRaba: [1, 3, 1, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2],
  minorPentatonic: [3, 2, 2, 3],
  majorPentatonic: [2, 2, 3, 2]
};

export const chordFromScale = (tonic, scale, chordToneIndexes) => {
  const fullScale = scaleFromTonic(tonic, scale);
  const filteredScale = [];
  chordToneIndexes.map(index => {
    filteredScale.push(fullScale[index - 1]);
  });
  return filteredScale;
};

export const scaleFromTonic = (tonic, intervals) => {
  const scale = [];
  let note = Tone.Frequency(tonic);
  scale.push(tonic);
  intervals.map(interval => {
    note = note.transpose(interval);
    scale.push(note.toFrequency());
  });
  return scale;
};
