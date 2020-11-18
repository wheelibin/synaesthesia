import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export interface SamplesMap {
  [note: string]: string;
}

export class Sample implements IInstrument {
  private sampler: Tone.Sampler;

  constructor(filenames: SamplesMap, volume = -15) {
    this.sampler = new Tone.Sampler({
      urls: filenames,
      baseUrl: `${process.env.PUBLIC_URL}/assets/sounds/`,
      volume,
    }).toDestination();
  }

  dispose(): void {
    this.sampler.dispose();
  }

  trigger({ time }: ITriggerParams): void {
    this.sampler.triggerAttack("C3", time);
  }

  triggerAttackRelease({ note, duration, time }: ITriggerParams): void {
    this.sampler.triggerRelease(note);
    this.sampler.triggerAttackRelease(note, duration, time);
  }
}
