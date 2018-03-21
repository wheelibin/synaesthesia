import Tone from "tone";
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

  const stayInKey = true;
  const progressionIntervals = utils.randomFromArray(scales.chordProgressions);
  const chordTypesToUseInProgression = scales.getRandomChordTypesForProgression(progressionIntervals);
  const chordProgression = scales.getChordProgressionForKey(songKey, progressionIntervals, chordTypesToUseInProgression, stayInKey);
  const possibleChordSectionLengths = [1, 2, 4, 8];
  const chordProgressionBars = utils.randomFromArray(possibleChordSectionLengths);
  const possibleChordPads = [instruments.pads.SimpleSine, instruments.pads.SwirlySawtoothChorusWithSubBass, instruments.pads.SoftSquareFm];
  const possibleBassInstruments = [instruments.bass.FastAttackSquare];
  const kickRythym = rythyms.randomKickRythym();
  const hihatRythym = rythyms.randomHiHatRythym();
  const shakerRythym = rythyms.randomShakerRythym();
  const openHatRythym = rythyms.randomOpenHatRythym();
  const bassLinePattern = rythyms.randomBassRythym();
  //const melodyPattern = [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0];
  const chordInstrument = new (utils.randomFromArray(possibleChordPads))();
  const bassInstrument = new (utils.randomFromArray(possibleBassInstruments))();
  const openHatFrequency = Tone.Frequency(songKey.root + "3").toFrequency();

  const generatedSettings = {
    key: `${songKey.root} (${songKey.typeName})`,
    chordOctave: songKey.chordOctave,
    chordProgression: progressionIntervals,
    chordProgressionBars: chordProgressionBars,
    chordTypesToUseInProgression: chordTypesToUseInProgression,
    kickRythym: kickRythym,
    hihatRythym: hihatRythym,
    bassLinePattern: bassLinePattern,
    chordInstrument: chordInstrument.constructor.name,
    bassInstrument: bassInstrument.constructor.name
  };

  parts.addChordProgression("0:0:0", chordProgression, chordInstrument, `${chordProgressionBars}m`, `${chordProgressionBars}m`, true);

  parts.addDrums("0:0:0", songKey.root + "0", new instruments.drums.KickDrum(), kickRythym, 1, true);
  parts.addDrums("0:0:0", undefined, new instruments.drums.HiHat(), hihatRythym, 0.9, true);
  parts.addDrums("0:0:0", undefined, new instruments.drums.Shaker(), shakerRythym, 0.8, true);
  parts.addDrums("0:0:0", undefined, new instruments.drums.OpenHat(openHatFrequency), openHatRythym, 0.8, true);

  const repeatEachSectionTimes = chordProgressionBars / (bassLinePattern.length / 16);
  parts.addRepeatingSoloPart(
    "0:0:0",
    scales.bassLineForChordProgression(chordProgression, songKey, stayInKey),
    bassInstrument,
    "4n",
    bassLinePattern,
    repeatEachSectionTimes,
    true
  );

  // parts.addRepeatingSoloPart(
  //   "0:0:0",
  //   scales.melodyForChordProgression(chordProgression, songKey),
  //   new instruments.lead.SimpleSine(),
  //   "4n",
  //   melodyPattern,
  //   repeatEachSectionTimes,
  //   true
  // );
  return generatedSettings;
};
