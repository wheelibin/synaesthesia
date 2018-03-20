import * as scales from "./scales";
import * as parts from "./parts";
import instruments from "./instruments";
import * as rythyms from "./rythyms";
import * as utils from "../utils";

export const play = () => {
  //pick a key
  const songKey = {
    root: scales.getRandomRootNote(),
    type: scales.scales.naturalMinor,
    chordOctave: utils.randomIntBetween(2, 4)
  };
  const chordProgression = scales.getRandomChordProgressionForKey(songKey);

  const possibleChordSectionLengths = [1, 2, 4, 8];
  const chordProgressionBars = utils.randomFromArray(possibleChordSectionLengths);

  const possibleChordPads = [new instruments.pads.SimpleSine(), new instruments.pads.SwirlySawtoothChorusWithSubBass()];

  parts.addChordProgression(
    "0:0:0",
    chordProgression,
    utils.randomFromArray(possibleChordPads),
    `${chordProgressionBars}m`,
    `${chordProgressionBars}m`,
    true
  );

  parts.addDrums("0:0:0", songKey.root + "0", new instruments.drums.KickDrum(), rythyms.randomKickRythym(), true);

  parts.addDrums("0:0:0", undefined, new instruments.drums.HiHat(), rythyms.randomHiHatRythym(), true);

  const bassLinePattern = rythyms.randomBassRythym();
  const repeatEachSectionTimes = chordProgressionBars / (bassLinePattern.length / 16);
  parts.addRepeatingSoloPart(
    "0:0:0",
    scales.bassLineForChordProgression(chordProgression, songKey),
    new instruments.bass.FastAttackSquare(),
    "4n",
    bassLinePattern,
    repeatEachSectionTimes,
    true
  );
};
