import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Bassoon extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        A3: "instruments/bassoon/A3.[mp3|ogg]",
        C2: "instruments/bassoon/C2.[mp3|ogg]",
        C3: "instruments/bassoon/C3.[mp3|ogg]",
        C4: "instruments/bassoon/C4.[mp3|ogg]",
        E3: "instruments/bassoon/E3.[mp3|ogg]",
        G1: "instruments/bassoon/G1.[mp3|ogg]",
        G2: "instruments/bassoon/G2.[mp3|ogg]",
        G3: "instruments/bassoon/G3.[mp3|ogg]",
        A1: "instruments/bassoon/A1.[mp3|ogg]",
        A2: "instruments/bassoon/A2.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
