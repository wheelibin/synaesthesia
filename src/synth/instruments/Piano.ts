import * as Tone from "tone";
import { Piano as _Piano } from "@tonejs/piano";

import { IInstrument, ITriggerParams } from "./IInstrument";

export class Piano implements IInstrument {
  private piano: _Piano;
  // private reverb: Tone.Reverb;

  constructor(volume = -13) {
    // this.reverb = new Tone.Reverb({ decay: 5 }).toDestination();

    this.piano = new _Piano({
      release: true,
      volume: {
        harmonics: volume,
        keybed: volume,
        pedal: volume,
        strings: volume,
      },
    }).toDestination();

    /*eslint-disable-next-line*/
    this.piano.load();
  }
  dispose(): void {
    this.piano.disconnect();
    this.piano.dispose();
  }

  trigger({ note, notes, duration, time }: ITriggerParams): void {
    // this.piano.pedalUp();
    // this.piano.pedalDown();

    if (note) {
      notes = [note];
    }

    // this instrument really needs this to remove the noticable lag triggering notes
    // see here: https://github.com/Tonejs/Tone.js/issues/306
    time = Tone.context.currentTime;

    for (const note of notes) {
      this.piano.keyDown({ note: Tone.Frequency(note).toNote(), time, velocity: 1 });
      const upTime = Tone.Time(time).toSeconds() + Tone.Time(duration).toSeconds();
      this.piano.keyUp({ note: Tone.Frequency(note).toNote(), time: upTime });
    }
  }
}
