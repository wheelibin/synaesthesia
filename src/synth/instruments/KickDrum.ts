import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class KickDrum extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    console.log("kick...");
    super({ filenames: { C3: "kick1.wav" }, volume: params.volume, attack: 0, addReverb: false });
    console.log("...created");
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
