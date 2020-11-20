import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class HiHatOpen extends Sampler implements IInstrument {
  constructor() {
    super({ filenames: { C3: "hatop1.wav" } });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
