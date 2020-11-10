import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export class PolySynth implements IInstrument {
  private synth: Tone.PolySynth;
  private reverb: Tone.Reverb;

  constructor(volume: number) {
    this.reverb = new Tone.Reverb({ decay: 0.3, wet: 0.5 }).toDestination();
    this.synth = new Tone.PolySynth(Tone.AMSynth, { volume }).connect(this.reverb);
  }
  dispose(): void {
    if (!this.synth.disposed) {
      this.reverb.disconnect();
      this.reverb.dispose();
      this.synth.disconnect();
      this.synth.dispose();
    }
  }

  trigger({ notes, duration, time }: ITriggerParams): void {
    this.synth.triggerAttackRelease(notes, duration, time);
  }
}
