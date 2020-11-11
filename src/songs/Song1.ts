import * as Tone from "tone";

import { SongBuilder } from "../synth/SongBuilder";
import * as utils from "../synth/utils";

import { KickDrum } from "../synth/instruments/KickDrum";
import { BassSynth } from "../synth/instruments/BassSynth";
import { MusicGenerator } from "../synth/MusicGenerator";
import { SongKey } from "../synth/types/SongKey";
import { PolySynth } from "../synth/instruments/PolySynth";
import { RythymGenerator } from "../synth/RythymGenerator";
import { HiHatClosed } from "../synth/instruments/HiHatClosed";
import { HiHatOpen } from "../synth/instruments/HiHatOpen";
import { Snare } from "../synth/instruments/Snare";
import { Song } from "./abstract/Song";
import { ICreateParams, ISongParams } from "./abstract/songTypes";
import { ISong } from "./abstract/ISong";
import { AcidSynth } from "../synth/instruments/AcidSynth";
import { PluckedBass } from "../synth/instruments/PluckedBass";

export class Song1 extends Song implements ISong {
  private kickPart: Tone.Sequence;
  private snarePart: Tone.Sequence;
  private closedHatPart: Tone.Sequence;
  private openHatPart: Tone.Sequence;
  private chordPart: Tone.Part;
  private bassPart: Tone.Sequence;
  private motifPart: Tone.Sequence;

  public create({
    seed,
    onBassNotePlayed,
    onMotifNotePlayed,
    onChordPlayed,
    onKickDrumHit,
    onSnareDrumHit,
    onClosedHatHit,
    onOpenHatHit,
  }: ICreateParams): ISongParams {
    const s = new SongBuilder();
    const music = new MusicGenerator();
    const rythym = new RythymGenerator();
    const keyType = music.getRandomScaleType();
    const key: SongKey = {
      root: music.getRandomRootNote(),
      type: keyType.intervals,
      typeName: keyType.type,
      chordOctave: utils.randomIntBetween(2, 3),
    };

    const progressionIntervals = utils.randomFromArray(music.chordProgressions);
    const chordTypesToUseInProgression = music.getRandomChordTypesForProgression(progressionIntervals.length);
    const chordProgression = music.getChordProgressionForKey(key, progressionIntervals, chordTypesToUseInProgression);
    const chordProgressionBars = rythym.randomChordProgressionRythym(progressionIntervals.length);

    const bassLinePatterns = [];
    for (let i = 0; i < progressionIntervals.length; i++) {
      bassLinePatterns.push(rythym.randomBassRythym());
    }
    const motifPatterns = [];
    for (let i = 0; i < chordProgression.length; i++) {
      motifPatterns.push(rythym.randomMotifRythym());
    }

    const notesPerChord = [];
    for (const bassLinePattern of bassLinePatterns) {
      notesPerChord.push(bassLinePattern.filter((hit: number) => hit === 1).length);
    }
    const bassOctave = key.chordOctave - 1;
    const bassLine = music.smoothBassLineForChordProgression(notesPerChord, chordProgression, key, bassOctave, 3);

    const motifOctave = key.chordOctave + 1;
    const motif = music.motifForChordProgression(notesPerChord, chordProgression, key, motifOctave);

    this.kickPart = s.addDrumPart(new KickDrum(), rythym.randomKickRythym(), onKickDrumHit);
    this.snarePart = s.addDrumPart(new Snare(), rythym.randomSnareRythym(), onSnareDrumHit);
    this.closedHatPart = s.addDrumPart(new HiHatClosed(), rythym.randomHiHatRythym(), onClosedHatHit);
    this.openHatPart = s.addDrumPart(new HiHatOpen(), rythym.randomOpenHatRythym(), onOpenHatHit);

    this.chordPart = s.addChordProgression(
      new PolySynth(-15),
      music.getChordProgressionForKey(key, progressionIntervals, chordTypesToUseInProgression),
      chordProgressionBars,
      onChordPlayed
    );

    this.bassPart = s.addBassLine(bassLine, new PluckedBass(3), bassLinePatterns, chordProgressionBars, onBassNotePlayed);

    this.motifPart = s.addMotif(motif, new AcidSynth(-27), motifPatterns, chordProgressionBars, onMotifNotePlayed);

    Tone.Transport.bpm.value = utils.randomIntBetween(90, 110);

    return { key };
  }

  public dispose(): void {
    this.stop();
    if (this.kickPart) this.kickPart.dispose();
    if (this.snarePart) this.snarePart.dispose();
    if (this.closedHatPart) this.closedHatPart.dispose();
    if (this.openHatPart) this.openHatPart.dispose();
    if (this.chordPart) this.chordPart.dispose();
    if (this.bassPart) this.bassPart.dispose();
    if (this.motifPart) this.motifPart.dispose();
  }
}
