import { SongKey } from "./types/SongKey";
import * as Tone from "tone";

import * as utils from "./utils";

export class MusicGenerator {
  private roots = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

  public scales: { [key: string]: number[] } = {
    Major: [2, 2, 1, 2, 2, 2],
    Minor: [2, 1, 2, 2, 1, 2],
    "Harmonic Minor": [2, 1, 2, 2, 1, 3],
    "Melodic Minor": [2, 1, 2, 2, 2, 2],
    "Pentatonic Major": [2, 2, 3, 2],
    "Pentatonic Minor": [3, 2, 2, 3],
    "Pentatonic Blues": [3, 2, 1, 1],
    "Pentatonic Neutral": [2, 3, 2],
    // Ionian: [2, 2, 1, 2, 2, 2],
    // Aeolian: [2, 1, 2, 2, 1, 2],
    Dorian: [2, 1, 2, 2, 2, 1],
    Mixolydian: [2, 2, 1, 2, 2, 1],
    Phrygian: [1, 2, 2, 2, 1, 2],
    Lydian: [2, 2, 2, 1, 2, 2],
    Locrian: [1, 2, 2, 1, 2, 2],
    Dominant7th: [2, 2, 1, 2, 2, 1],
    Blues: [3, 2, 1, 1, 3],
    //   Dimhalf: [1, 2, 1, 2, 1, 2],
    //   Dimwhole: [2, 1, 2, 1, 2, 1],
    //   Whole: [2, 2, 2, 2],
    //   Augmented: [3, 1, 3, 1],
    //   Chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //   RoumanianMinor: [2, 1, 3, 1, 2, 1],
    //   SpanishGypsy: [1, 3, 1, 2, 1, 2],
    //   Diatonic: [2, 2, 3, 2],
    //   DoubleHarmonic: [1, 3, 1, 2, 1, 3],
    //   EightToneSpanish: [1, 2, 1, 1, 1, 2, 2],
    //   Enigmatic: [1, 3, 2, 2, 2, 1],
    //   LeadingWholeTone: [2, 2, 2, 2, 1],
    //   LydianAugmented: [2, 2, 2, 2, 1, 2],
    //   NeopolitanMajor: [1, 2, 2, 2, 2, 2],
    //   NeopolitanMinor: [1, 2, 2, 2, 1, 2],
    //   Pelog: [1, 2, 3, 4],
    //   Prometheus: [2, 2, 2, 3, 1],
    //   PrometheusNeopolitan: [1, 3, 2, 3, 1],
    //   SixToneSymmetrical: [1, 3, 1, 3, 1],
    //   SuperLocrian: [1, 2, 1, 2, 2, 2],
    //   LydianMinor: [2, 2, 2, 1, 1, 2],
    //   LydianDiminished: [2, 1, 3, 1, 1, 2],
    //   NineToneScale: [2, 1, 1, 2, 1, 1, 1, 2],
    //   AuxiliaryDiminished: [2, 1, 2, 1, 2, 1, 2],
    //   AuxiliaryAugmented: [2, 2, 2, 2, 2],
    //   AuxiliaryDimBlues: [1, 2, 1, 2, 1, 2, 1],
    //   MajorLocrian: [2, 2, 1, 1, 2, 2],
    //   Overtone: [2, 2, 2, 1, 2, 1],
    //   DiminishedWholeTone: [1, 2, 1, 2, 2, 2],
    //   PureMinor: [2, 1, 2, 2, 1, 2]
  };

  public chordProgressions = [
    [1, 6, 4, 5],
    [1, 4, 7, 4],
    [2, 5, 1],
    [1, 5, 7, 4],
    [6, 2, 5, 1],
    [1, 5, 6, 3],
    [1, 4, 2, 5],
  ];

  private chords: number[][] = [
    [1, 3, 5],
    [1, 3, 5, 7],
    [1, 3, 5, 9],
    [1, 3, 5, 11],
    // [1, 3, 5, 7, 9],
    // [1, 3, 5, 7, 9, 11],
  ];

  public getRandomRootNote(): string {
    return this.roots[utils.randomIntBetween(0, this.roots.length - 1)];
  }

  public actualNotesFromScale(tonic: Tone.Unit.Frequency, scale: number[], lowOctave: number, highOctave: number): Tone.Unit.Frequency[] {
    let notes: Tone.Unit.Frequency[] = [];

    //Get just the note value without octaves
    //console.log(tonic);
    // tonic = Tone.Frequency(tonic).toNote().replace(/[0-9]/g, "");

    for (let octave = lowOctave; octave <= highOctave; octave++) {
      const octaveScale = this.scaleFromTonic(`${tonic}${octave}`, scale);
      notes = [...notes, ...octaveScale];
    }

    return notes;
  }

  public getRandomScaleType(): { type: string; intervals: number[] } {
    const keys = Object.keys(this.scales);
    const randomType = keys[(keys.length * Math.random()) << 0];
    return { type: randomType, intervals: this.scales[randomType] };
  }

  public getChordProgressionForKey(key: SongKey, progression: number[], chordTypesToUse: number[][]): Tone.Unit.Frequency[][] {
    const progressionRootNotes = this.chordFromScale(progression, key.root, key.type, key.chordOctave);

    const progressionNotes = [];
    for (let index = 0; index < progressionRootNotes.length; index++) {
      const progressionIndex = progression[index];
      const chord = chordTypesToUse[index];
      const notes = this.chordFromScale(chord, key.root, key.type, key.chordOctave, progressionIndex);
      progressionNotes.push(notes);
    }
    return progressionNotes;
  }

  public getRandomChordTypesForProgression(qty: number): number[][] {
    const chordTypes = [];
    for (let index = 0; index < qty; index++) {
      chordTypes.push(utils.randomFromArray(this.chords));
    }
    return chordTypes;
  }

  public chordFromScale(
    chordToneIndexes: number[],
    tonic: Tone.Unit.Frequency,
    scale: number[],
    mainOctave: number,
    indexOffset = 0
  ): Tone.Unit.Frequency[] {
    const fullScale = this.actualNotesFromScale(tonic, scale, mainOctave, mainOctave + 1);

    const filteredScale = [];
    for (const index of chordToneIndexes) {
      const note = fullScale[index + indexOffset - 1];
      if (note) {
        filteredScale.push(note);
      }
    }

    return filteredScale;
  }

  public scaleFromTonic(tonic: Tone.Unit.Frequency, intervals: number[]): Tone.Unit.Frequency[] {
    const scale = [];
    let note = Tone.Frequency(tonic);
    scale.push(tonic);

    for (const interval of intervals) {
      note = note.transpose(interval);
      scale.push(note.toFrequency());
    }

    return scale;
  }

  //   public rootNotesFromChordProgression = (chordProgression) => {
  //     return chordProgression.map((chord) => Tone.Frequency(chord[0]).toNote().replace(/[0-9]/g, "")).join(", ");
  //   };

  //   public bassLineForChordProgression = (notesPerChord, chordProgression, key, octave) => {
  //     const transposeSemiTones = -1 * octave * 12;
  //     const notes = [];

  //     for (let i = 0; i < chordProgression.length; i++) {
  //       const chord = chordProgression[i];
  //       const noteCountForChord = notesPerChord[i];
  //       const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
  //       const scaleForCurrentChord = this.actualNotesFromScale(key.root, key.type, octave, octave);

  //       const notesForChord = [chordRoot];
  //       for (let i = 0; i < noteCountForChord - 1; i++) {
  //         notesForChord.push(utils.randomFromArray(scaleForCurrentChord));
  //       }
  //       notes.push(notesForChord);
  //     }

  //     return notes;
  //   };

  public smoothBassLineForChordProgression(
    notesPerChord: number[],
    chordProgression: Tone.Unit.Frequency[][],
    key: SongKey,
    octave: number,
    maxNoteDistance: number
  ): Tone.Unit.Frequency[][] {
    const transposeSemiTones = -1 * octave * 12;
    const notes = [];

    for (let i = 0; i < chordProgression.length; i++) {
      const chord = chordProgression[i];

      const noteCountForChord = notesPerChord[i];
      const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
      const scaleForCurrentChord = this.actualNotesFromScale(key.root, key.type, octave, octave);

      const notesForChord: Tone.Unit.Frequency[] = [chordRoot.toFrequency()];
      let previousNoteIndex = 0;
      for (let i = 0; i < noteCountForChord - 1; i++) {
        //get a note not too far away from the last
        const newNote = utils.randomIntBetween(
          Math.max(previousNoteIndex - maxNoteDistance, 0),
          Math.min(previousNoteIndex + maxNoteDistance, scaleForCurrentChord.length - 1)
        );

        notesForChord.push(scaleForCurrentChord[newNote]);

        previousNoteIndex = newNote;
      }
      notes.push(notesForChord);
    }

    return notes;
  }

  public motifForChordProgression(
    notesPerChord: number[],
    chordProgression: Tone.Unit.Frequency[][],
    key: SongKey,
    octave: number
  ): Tone.Unit.Frequency[][] {
    const notes = [];

    for (let i = 0; i < chordProgression.length; i++) {
      const noteCountForChord = notesPerChord[i];
      const scaleForCurrentChord = this.actualNotesFromScale(key.root, key.type, octave, octave);
      const notesForChord = [];
      let previousNoteIndex = 0;
      for (let i = 0; i < noteCountForChord; i++) {
        //get a note not too far away from the last
        const newNote = utils.randomIntBetween(Math.max(previousNoteIndex - 2, 0), Math.min(previousNoteIndex + 2, scaleForCurrentChord.length));
        notesForChord.push(scaleForCurrentChord[newNote]);

        previousNoteIndex = newNote;
      }
      notes.push(notesForChord);
    }

    return notes;
  }

  //   public melodyForChordProgression = (chordProgression, key) => {
  //     //const notesPerChord = 8;
  //     const melodyOctave = key.chordOctave + 1;
  //     const transposeSemiTones = melodyOctave - key.chordOctave * 12;
  //     const notes = [];

  //     for (const chord of chordProgression) {
  //       const chordRoot = Tone.Frequency(chord[0]).transpose(transposeSemiTones);
  //       const chordRootToNote = Tone.Frequency(chordRoot).toNote();

  //       const scaleForCurrentChord = this.actualNotesFromScale(chordRootToNote, key.type, melodyOctave, melodyOctave);
  //       const notesForChord = [chordRootToNote];

  //       notesForChord.push(scaleForCurrentChord[1]);
  //       notesForChord.push(scaleForCurrentChord[2]);
  //       notesForChord.push(scaleForCurrentChord[1]);
  //       notesForChord.push(scaleForCurrentChord[4]);
  //       notesForChord.push(scaleForCurrentChord[4]);
  //       notesForChord.push(scaleForCurrentChord[2]);
  //       notesForChord.push(scaleForCurrentChord[0]);

  //       notes.push(notesForChord);
  //     }

  //     return notes;
  //   };
}
