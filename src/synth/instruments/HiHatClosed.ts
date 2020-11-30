import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class HiHatClosed extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({ filenames: { C3: "hatcl1.wav" }, volume: params.volume, attack: 0 });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
