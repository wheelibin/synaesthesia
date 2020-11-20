import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class FrenchHorn extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        D2: "instruments/french-horn/D2.[mp3|ogg]",
        D4: "instruments/french-horn/D4.[mp3|ogg]",
        "D#1": "instruments/french-horn/Ds1.[mp3|ogg]",
        F2: "instruments/french-horn/F2.[mp3|ogg]",
        F4: "instruments/french-horn/F4.[mp3|ogg]",
        G1: "instruments/french-horn/G1.[mp3|ogg]",
        A0: "instruments/french-horn/A0.[mp3|ogg]",
        A2: "instruments/french-horn/A2.[mp3|ogg]",
        C1: "instruments/french-horn/C1.[mp3|ogg]",
        C3: "instruments/french-horn/C3.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
