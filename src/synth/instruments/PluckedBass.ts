import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export class PluckedBass implements IInstrument {
  private synth: Tone.AMSynth;

  constructor(volume = 3) {
    this.synth = new Tone.AMSynth({
      volume,
      harmonicity: 2,
      oscillator: {
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 1.01,
      },
      envelope: {
        attack: 0.006,
        decay: 4,
        sustain: 0.04,
        release: 1.2,
      },
      modulation: {
        volume: 13,
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 12,
      },
      modulationEnvelope: {
        attack: 0.006,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4,
      },
    }).toDestination();
  }
  dispose(): void {
    this.synth.dispose();
  }

  trigger({ note, duration, time }: ITriggerParams): void {
    this.synth.envelope.cancel();
    this.synth.triggerAttackRelease(note, duration, time);
  }
}
