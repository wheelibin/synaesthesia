import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export interface SamplesMap {
  [note: string]: string;
}
export interface ISampleConstructorParams {
  filenames: SamplesMap;
  volume?: number;
  addReverb?: boolean;
  attack?: number;
  stopActiveNotesOnTrigger?: boolean;
  pan?: number;
}

export class Sampler implements IInstrument {
  private sampler: Tone.Sampler;
  private reverb: Tone.Reverb;
  private panner: Tone.Panner;
  private params: ISampleConstructorParams;

  constructor(params: ISampleConstructorParams) {
    this.params = params;

    this.sampler = new Tone.Sampler({
      urls: params.filenames,
      baseUrl: `${process.env.PUBLIC_URL}/assets/sounds/`,
      volume: params.volume || -15,
      attack: params.attack,
    });

    if (params.addReverb !== false) {
      this.reverb = new Tone.Reverb({ wet: 0.4, decay: 3 }).toDestination();
      this.sampler.connect(this.reverb);
    } else {
      this.sampler.toDestination();
    }

    if (params.pan) {
      this.panner = new Tone.Panner({ pan: params.pan }).toDestination();
      this.sampler.connect(this.panner);
    }
  }

  dispose(): void {
    this.sampler.releaseAll(Tone.context.currentTime);
    if (this.reverb) {
      this.reverb.dispose();
    }
    this.sampler.dispose();
  }

  trigger({ time }: ITriggerParams): void {
    this.sampler.triggerAttack("C3", time);
  }

  triggerAttackRelease({ note, notes, duration, time, velocity }: ITriggerParams): void {
    //this.sampler.releaseAll(Tone.context.currentTime);

    if (note) {
      notes = [note];
    }
    this.sampler.triggerAttackRelease(notes, duration, time, velocity);
    // this.sampler.triggerAttack(notes, time, velocity);
    // this.sampler.triggerRelease(notes, Tone.Time(time).toSeconds() + Tone.Time(duration).toSeconds());
  }
}
