import Tone from "tone";
import * as utils from "../utils";

const roots = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
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
  [1, 1, 1, 1, 4, 4, 1, 1, 5, 5, 1, 1],
  [1, 6, 4, 5],
  [1, 4, 7, 4],
  [2, 5, 1],
  [1, 5, 7, 4],
  [6, 2, 5, 1],
  [1, 5, 6, 3],
  [1, 4, 2, 5],
  [1, 5, 6, 3, 4, 1, 4, 5]
];

const chords = [[1, 3, 5], [1, 3, 5, 7], [1, 3, 5, 9], [1, 3, 5, 7, 9], [1, 3, 5, 7, 9, 11]];

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

export const getRandomScaleType = () => {
  var keys = Object.keys(scales);
  var randomType = keys[(keys.length * Math.random()) << 0];
  return { type: randomType, intervals: scales[randomType] };
};

export const getChordProgressionForKey = (key, progression, chordTypesToUse) => {
  const progressionRootNotes = chordFromScale(progression, key.root, key.type, key.chordOctave);

  const progressionNotes = [];

  for (let index = 0; index < progressionRootNotes.length; index++) {
    const progressionRootNote = progressionRootNotes[index];
    const chord = chordTypesToUse[index];
    progressionNotes.push(chordFromScale(chord, progressionRootNote, key.type, key.chordOctave));
  }
  return progressionNotes;
};

export const getRandomChordTypesForProgression = progressionRootNotes => {
  const chordTypes = [];
  for (let index = 0; index < progressionRootNotes.length; index++) {
    chordTypes.push(utils.randomFromArray(chords));
  }
  return chordTypes;
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
  const bassOctave = key.chordOctave - 1;
  const transposeSemiTones = -1 * bassOctave * 12;
  const notes = [];

  for (const chord of chordProgression) {
    const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
    const chordRootToNote = Tone.Frequency(chordRoot).toNote();
    const scaleForCurrentChord = actualNotesFromScale(chordRootToNote, key.type, bassOctave, bassOctave);
    const notesForChord = [chordRoot];
    for (let i = 0; i < notesPerChord - 1; i++) {
      notesForChord.push(utils.randomFromArray(scaleForCurrentChord));
    }
    notes.push(notesForChord);
  }

  return notes;
};

export const melodyForChordProgression = (chordProgression, key) => {
  //const notesPerChord = 8;
  const melodyOctave = key.chordOctave + 1;
  const transposeSemiTones = melodyOctave - key.chordOctave * 12;
  const notes = [];

  for (const chord of chordProgression) {
    const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
    const chordRootToNote = Tone.Frequency(chordRoot).toNote();

    const scaleForCurrentChord = actualNotesFromScale(chordRootToNote, key.type, melodyOctave, melodyOctave);
    const notesForChord = [chordRootToNote];

    notesForChord.push(scaleForCurrentChord[1]);
    notesForChord.push(scaleForCurrentChord[2]);
    notesForChord.push(scaleForCurrentChord[1]);
    notesForChord.push(scaleForCurrentChord[4]);
    notesForChord.push(scaleForCurrentChord[4]);
    notesForChord.push(scaleForCurrentChord[2]);
    notesForChord.push(scaleForCurrentChord[0]);

    notes.push(notesForChord);
  }

  return notes;
};
