import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class HiHatClosed extends Sampler implements IInstrument {
  constructor() {
    super({ filenames: { C3: "hatcl1.wav" } });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
