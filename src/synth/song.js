import * as scales from "./scales";
import * as parts from "./parts";

export const play = () => {
  //pick a key
  const songKey = {
    root: scales.getRandomRootNote(),
    type: scales.scales.naturalMinor
  };

  //pick a chord progression
  const chordProgression = scales.getRandomChordProgressionForKey(songKey, 2);
  parts.addChords(chordProgression);
  parts.addDrums(songKey);

  //pick a chord rythym

  //add a bass line changing with chord progression
  //parts.addBass(songKey, chordProgression);

  //add a melody in same key or harmonising key
};
