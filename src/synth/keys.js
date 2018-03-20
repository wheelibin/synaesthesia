import * as scales from "./scales";

export const keyFromTonicAndScale = (tonic, scale, lowOctave, highOctave) => {
  let notes = [];
  for (let octave = lowOctave; octave <= highOctave; octave++) {
    const octaveScale = scales.scaleFromTonic(tonic + octave, scale);
    notes = [...notes, ...octaveScale];
  }
  return notes;
};
