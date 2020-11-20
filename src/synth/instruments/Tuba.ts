import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Tuba extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        "A#1": "instruments/tuba/As1.[mp3|ogg]",
        "A#2": "instruments/tuba/As2.[mp3|ogg]",
        D2: "instruments/tuba/D2.[mp3|ogg]",
        D3: "instruments/tuba/D3.[mp3|ogg]",
        "D#1": "instruments/tuba/Ds1.[mp3|ogg]",
        F0: "instruments/tuba/F0.[mp3|ogg]",
        F1: "instruments/tuba/F1.[mp3|ogg]",
        F2: "instruments/tuba/F2.[mp3|ogg]",
        "A#0": "instruments/tuba/As0.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
