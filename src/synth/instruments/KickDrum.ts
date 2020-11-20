import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class KickDrum extends Sampler implements IInstrument {
  constructor() {
    super({ filenames: { C3: "kick1.wav" } });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
