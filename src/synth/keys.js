import * as scales from "./scales";

export const dMajor = (lowOctave = 1, highOctave = 6) => {
  return keyFromTonicAndScale("D", scales.scales.major, lowOctave, highOctave);
};

export const keyFromTonicAndScale = (tonic, scale, lowOctave, highOctave) => {
  let notes = [];
  for (let octave = lowOctave; octave <= highOctave; octave++) {
    const octaveScale = scales.scaleFromTonic(tonic + octave, scale);
    notes = [...notes, ...octaveScale];
  }
  return notes;
};
