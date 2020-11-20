import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Snare extends Sampler implements IInstrument {
  constructor() {
    super({ filenames: { C3: "snare1.wav" } });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
