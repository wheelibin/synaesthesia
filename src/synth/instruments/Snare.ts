import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Snare extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({ filenames: { C3: "snare1.wav" }, volume: params.volume, attack: 0, addReverb: false });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
