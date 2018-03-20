import * as scales from "./scales";
import * as parts from "./parts";
import instruments from "./instruments";
import * as rythyms from "./rythyms";
import * as utils from "../utils";

export const play = () => {
  const keyType = scales.getRandomScaleType();
  const songKey = {
    root: scales.getRandomRootNote(),
    type: keyType.intervals,
    typeName: keyType.type,
    chordOctave: utils.randomIntBetween(2, 4)
  };

  const progressionIntervals = utils.randomFromArray(scales.chordProgressions);
  const chordTypesToUseInProgression = scales.getRandomChordTypesForProgression(progressionIntervals);
  const chordProgression = scales.getChordProgressionForKey(songKey, progressionIntervals, chordTypesToUseInProgression);
  const possibleChordSectionLengths = [1, 2, 4, 8];
  const chordProgressionBars = utils.randomFromArray(possibleChordSectionLengths);
  const possibleChordPads = [
    new instruments.pads.SimpleSine(),
    new instruments.pads.SwirlySawtoothChorusWithSubBass(),
    new instruments.pads.SoftSquareFm()
  ];
  const kickRythym = rythyms.randomKickRythym();
  const hihatRythym = rythyms.randomHiHatRythym();
  const bassLinePattern = rythyms.randomBassRythym();
  const chordInstrument = utils.randomFromArray(possibleChordPads);

  const generatedSettings = {
    key: `${songKey.root} (${songKey.typeName})`,
    chordOctave: songKey.chordOctave,
    chordProgression: progressionIntervals,
    chordProgressionBars: chordProgressionBars,
    chordTypesToUseInProgression: chordTypesToUseInProgression,
    kickRythym: kickRythym,
    hihatRythym: hihatRythym,
    bassLinePattern: bassLinePattern,
    chordInstrument: chordInstrument.constructor.name
  };

  parts.addChordProgression("0:0:0", chordProgression, chordInstrument, `${chordProgressionBars}m`, `${chordProgressionBars}m`, true);
  parts.addDrums("0:0:0", songKey.root + "0", new instruments.drums.KickDrum(), kickRythym, true);
  parts.addDrums("0:0:0", undefined, new instruments.drums.HiHat(), hihatRythym, true);

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

  return generatedSettings;
};
