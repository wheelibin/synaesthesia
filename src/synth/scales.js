import Tone from "tone";
import * as utils from "../utils";

const roots = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];
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

export const chordProgressions = [
  [1, 5, 4, 4, 1, 5, 1, 5],
  [1, 6, 4, 5],
  [1, 4, 7, 4],
  [2, 5, 1],
  [1, 5, 7, 4],
  [6, 2, 5, 1],
  [1, 5, 6, 3],
  [1, 4, 2, 5],
  [1, 5, 6, 3, 4, 1, 4, 5]
];

export const getRandomRootNote = () => {
  return roots[utils.randomIntBetween(0, roots.length - 1)];
};

export const actualNotesFromScale = (tonic, scale, lowOctave, highOctave) => {
  let notes = [];

  //Get just the note value without octaves
  if (!utils.isNumeric(tonic)) {
    tonic = tonic.replace(/[0-9]/g, "");
  } else {
    tonic = Tone.Frequency(tonic)
      .toNote()
      .replace(/[0-9]/g, "");
  }

  for (let octave = lowOctave; octave <= highOctave; octave++) {
    const octaveScale = scaleFromTonic(tonic + octave, scale);
    notes = [...notes, ...octaveScale];
  }
  return notes;
};

export const getRandomChordProgressionForKey = key => {
  const progressionRootNotes = chordFromScale(
    chordProgressions[utils.randomIntBetween(0, chordProgressions.length - 1)],
    key.root,
    key.type,
    key.chordOctave
  );

  const progression = [];

  for (const progressionRootNote of progressionRootNotes) {
    const chord = [1, 3, 5, 7];
    progression.push(chordFromScale(chord, progressionRootNote, key.type, key.chordOctave));
  }

  return progression;
};

export const chordFromScale = (chordToneIndexes, tonic, scale, mainOctave) => {
  const fullScale = actualNotesFromScale(tonic, scale, mainOctave, mainOctave + 1);

  const filteredScale = [];
  for (const index of chordToneIndexes) {
    filteredScale.push(fullScale[index - 1]);
  }

  return filteredScale;
};

export const scaleFromTonic = (tonic, intervals) => {
  const scale = [];
  let note = Tone.Frequency(tonic);
  scale.push(tonic);

  for (const interval of intervals) {
    note = note.transpose(interval);
    scale.push(note.toFrequency());
  }

  return scale;
};

export const bassLineForChordProgression = (chordProgression, key) => {
  const notesPerChord = 4;
  const notes = [];

  for (const chord of chordProgression) {
    const transposeSemiTones = -1 * (key.chordOctave - 1) * 12;
    const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
    const possibleNotesForCurrentChord = actualNotesFromScale(key.root, key.type, 1, 1);
    const notesForChord = [chordRoot];
    for (let i = 0; i < notesPerChord - 1; i++) {
      const rnd = utils.randomIntBetween(0, possibleNotesForCurrentChord.length - 1);
      notesForChord.push(possibleNotesForCurrentChord[rnd]);
    }
    notes.push(notesForChord);
  }

  return notes;
};
