import * as Tone from "tone";

import { SongBuilder } from "../synth/SongBuilder";
import * as utils from "../synth/utils";

import { KickDrum } from "../synth/instruments/KickDrum";
import { MusicGenerator } from "../synth/MusicGenerator";
import { RythymGenerator } from "../synth/RythymGenerator";
import { InstrumentSelector } from "../synth/InstrumentSelector";
import { SongKey } from "../synth/types/SongKey";
import { HiHatClosed } from "../synth/instruments/HiHatClosed";
import { HiHatOpen } from "../synth/instruments/HiHatOpen";
import { Snare } from "../synth/instruments/Snare";
import { Song } from "./abstract/Song";
import { ICreateParams, ISongParams } from "./abstract/songTypes";
import { ISong } from "./abstract/ISong";

export class Song1 extends Song implements ISong {
  private kickPart: Tone.Sequence;
  private snarePart: Tone.Sequence;
  private closedHatPart: Tone.Sequence;
  private openHatPart: Tone.Sequence;
  private chordPart: Tone.Part;
  private bassPart: Tone.Sequence;
  private motifPart: Tone.Sequence;

  public async create({
    seed,
    onBassNotePlayed,
    onMotifNotePlayed,
    onChordPlayed,
    onKickDrumHit,
    onSnareDrumHit,
    onClosedHatHit,
    onOpenHatHit,
  }: ICreateParams): Promise<ISongParams> {
    await new Promise((resolve) => resolve());

    // await (Tone.getContext() as Tone.Context).close();
    // Tone.setContext(new Tone.Context());

    const s = new SongBuilder();
    const music = new MusicGenerator();
    const rythym = new RythymGenerator();
    const instruments = new InstrumentSelector();
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

    const maxBarLength = 2;
    const _chordProgressionBars = rythym.randomChordProgressionRythym(progressionIntervals.length);
    const chordProgressionBars: (number | number[])[] = [];
    for (const b of _chordProgressionBars) {
      chordProgressionBars.push(b > maxBarLength ? [b / 2, b / 2] : b);
    }

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
    const bassLine = music.smoothMelodyLineForChordProgression(notesPerChord, chordProgression, key, bassOctave, 3);

    const motifOctave = key.chordOctave + 1;
    const motif = music.smoothMelodyLineForChordProgression(notesPerChord, chordProgression, key, motifOctave, 2);

    const kit = instruments.randomKit();

    if (kit.drums) {
      this.kickPart = s.addDrumPart(new KickDrum(), rythym.randomKickRythym(), onKickDrumHit);
      this.snarePart = s.addDrumPart(new Snare(), rythym.randomSnareRythym(), onSnareDrumHit);
      this.closedHatPart = s.addDrumPart(new HiHatClosed(), rythym.randomHiHatRythym(), onClosedHatHit);
      this.openHatPart = s.addDrumPart(new HiHatOpen(), rythym.randomOpenHatRythym(), onOpenHatHit);
    }

    this.chordPart = s.addChordProgression(
      kit.chord,
      music.getChordProgressionForKey(key, progressionIntervals, chordTypesToUseInProgression),
      chordProgressionBars,
      onChordPlayed
    );

    this.bassPart = s.addSoloPart(bassLine, kit.bass, bassLinePatterns, chordProgressionBars, onBassNotePlayed);
    this.motifPart = s.addSoloPart(motif, kit.motif, motifPatterns, chordProgressionBars, onMotifNotePlayed);

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
