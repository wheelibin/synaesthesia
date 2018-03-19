import * as scales from "./scales";
import * as parts from "./parts";
import instruments from "./instruments";

export const play = () => {
  //pick a key
  const songKey = {
    root: scales.getRandomRootNote(),
    type: scales.scales.naturalMinor
  };
  const chordProgression = scales.getRandomChordProgressionForKey(songKey, 2);

  parts.addChordProgression(
    "0:0:0",
    chordProgression,
    new instruments.pads.SwirlyChorusWithSubBass(),
    "4m",
    "4m",
    true
  );

  parts.addDrums(
    "0:0:0",
    songKey.root + "0",
    new instruments.drums.KickDrum(),
    [1, 0, 0, 0],
    true
  );

  parts.addDrums(
    "0:0:0",
    undefined,
    new instruments.drums.HiHat(),
    // prettier-ignore
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    true
  );
};
