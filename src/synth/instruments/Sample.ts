import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export class Sample implements IInstrument {
  private sampler: Tone.Sampler;

  constructor(filename: string) {
    this.sampler = new Tone.Sampler({
      urls: {
        C3: filename,
      },
      baseUrl: `${process.env.PUBLIC_URL}/assets/sounds/`,
      volume: -15,
    }).toDestination();
  }

  dispose(): void {
    this.sampler.dispose();
  }

  trigger({ time }: ITriggerParams): void {
    this.sampler.triggerAttack("C3", time);
  }
}
