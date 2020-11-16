import * as Tone from "tone";
import { ISongCallback } from "../songs/abstract/songTypes";
import { IInstrument } from "./instruments/IInstrument";
import * as utils from "./utils";

export class SongBuilder {
  public addDrumPart(instrument: IInstrument, pattern: Array<number | number[]>, visCallback?: ISongCallback): Tone.Sequence {
    const sequencer = new Tone.Sequence(
      (time, hit) => {
        if (hit === 1) {
          instrument.trigger({ time });

          // fire the draw callback
          if (visCallback) {
            Tone.Draw.schedule(() => {
              visCallback();
            }, time);
          }
        }
      },
      pattern,
      "16n"
    );
    sequencer.loop = true;
    sequencer.start(0);

    return sequencer;
  }

  public addChordProgression(
    instrument: IInstrument,
    chordProgression: Tone.Unit.Frequency[][],
    chordBars: number[],
    visCallback?: ISongCallback
  ): Tone.Part {
    const totalBarCount = chordBars.reduce((sum, x) => sum + x);

    const progPart = chordProgression.map((chord, index) => {
      const startingPos = index === 0 ? 0 : chordBars[index - 1];

      return [index * Tone.Time(`${startingPos}m`).toSeconds(), chord];
    });

    let currentChord = 0;
    const part = new Tone.Part((time, notes) => {
      const playedNotes = notes as Tone.Unit.Frequency[];
      const chordDuration = `${chordBars[currentChord]}m`;

      // the notes given as the second element in the array
      // will be passed in as the second argument
      console.log(playedNotes, chordDuration);
      instrument.trigger({ notes: playedNotes, duration: chordDuration, time });
      // fire the draw callback
      if (visCallback) {
        Tone.Draw.schedule(() => {
          visCallback({ notes: playedNotes, duration: chordDuration });
        }, time);
      }

      currentChord++;
      if (currentChord === chordBars.length) {
        currentChord = 0;
      }
    }, progPart);

    part.loop = true;
    part.loopEnd = `${totalBarCount}m`;
    part.start(0);

    return part;
  }

  public addBassLine(
    bassLineNotes: Tone.Unit.Frequency[][],
    instrument: IInstrument,
    patterns: number[][],
    chordBars: number[],
    visCallback: ISongCallback
  ): Tone.Sequence {
    return this.addRepeatingSoloPart("0:0:0", bassLineNotes, instrument, "16n", patterns, chordBars, true, visCallback);
  }

  public addMotif(
    bassLineNotes: Tone.Unit.Frequency[][],
    instrument: IInstrument,
    patterns: number[][],
    chordBars: number[],
    visCallback: ISongCallback
  ): Tone.Sequence {
    return this.addRepeatingSoloPart("0:0:0", bassLineNotes, instrument, "2n", patterns, chordBars, true, visCallback);
  }

  private addRepeatingSoloPart(
    startTime: Tone.Unit.Time,
    notes: Tone.Unit.Frequency[][],
    instrument: IInstrument,
    noteLength: Tone.Unit.Time,
    patterns: number[][],
    barLengths: number[],
    shouldLoop: boolean,
    visCallback: ISongCallback
  ): Tone.Sequence {
    const expandedSequence: Tone.Unit.Frequency[] = [];
    for (let index = 0; index < notes.length; index++) {
      const section = notes[index];
      for (let ri = 0; ri < barLengths[index]; ri++) {
        for (let ni = 0; ni < section.length; ni++) {
          const note = section[ni];
          expandedSequence.push(note);
        }
      }
    }

    const expandedPattern = [];
    for (let index = 0; index < patterns.length; index++) {
      const section = patterns[index];
      for (let ri = 0; ri < barLengths[index]; ri++) {
        for (let ni = 0; ni < section.length; ni++) {
          const rythym = section[ni];
          expandedPattern.push(rythym);
        }
      }
    }

    const sequencer = new Tone.Sequence(
      (time, hit) => {
        if (hit === 1) {
          // Play the next note
          const note = expandedSequence.shift();
          expandedSequence.push(note);
          const duration = utils.randomIntBetween(1, 8) * Tone.Time(noteLength).toSeconds();
          instrument.trigger({ note, duration, time });

          // fire the draw callback
          if (visCallback) {
            Tone.Draw.schedule(() => {
              visCallback({ note, duration });
            }, time);
          }
        }
      },
      expandedPattern,
      "16n"
    );

    // sequencer.humanize = true;
    sequencer.loop = shouldLoop;
    sequencer.start(startTime);

    return sequencer;
  }
}
