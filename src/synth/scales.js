export const dHarmonicMinor = (lowOctave = 1, highOctave = 6) => {
  const scale = [];
  for (let octave = lowOctave; octave <= highOctave; octave++) {
    scale.push("D" + octave);
    scale.push("E" + octave);
    scale.push("F" + octave);
    scale.push("G" + octave);
    scale.push("A" + octave);
    scale.push("Bb" + octave);
    scale.push("C#" + octave);
  }
  return scale;
};

export const dMajor = (lowOctave = 1, highOctave = 6) => {
  const scale = [];
  for (let octave = lowOctave; octave <= highOctave; octave++) {
    scale.push("D" + octave);
    scale.push("E" + octave);
    scale.push("F" + octave);
    scale.push("G" + octave);
    scale.push("A" + octave);
    scale.push("B" + octave);
    scale.push("C" + octave);
  }
  return scale;
};
