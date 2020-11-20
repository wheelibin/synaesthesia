import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Harp extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        C5: "instruments/harp/C5.[mp3|ogg]",
        D2: "instruments/harp/D2.[mp3|ogg]",
        D4: "instruments/harp/D4.[mp3|ogg]",
        D6: "instruments/harp/D6.[mp3|ogg]",
        D7: "instruments/harp/D7.[mp3|ogg]",
        E1: "instruments/harp/E1.[mp3|ogg]",
        E3: "instruments/harp/E3.[mp3|ogg]",
        E5: "instruments/harp/E5.[mp3|ogg]",
        F2: "instruments/harp/F2.[mp3|ogg]",
        F4: "instruments/harp/F4.[mp3|ogg]",
        F6: "instruments/harp/F6.[mp3|ogg]",
        F7: "instruments/harp/F7.[mp3|ogg]",
        G1: "instruments/harp/G1.[mp3|ogg]",
        G3: "instruments/harp/G3.[mp3|ogg]",
        G5: "instruments/harp/G5.[mp3|ogg]",
        A2: "instruments/harp/A2.[mp3|ogg]",
        A4: "instruments/harp/A4.[mp3|ogg]",
        A6: "instruments/harp/A6.[mp3|ogg]",
        B1: "instruments/harp/B1.[mp3|ogg]",
        B3: "instruments/harp/B3.[mp3|ogg]",
        B5: "instruments/harp/B5.[mp3|ogg]",
        B6: "instruments/harp/B6.[mp3|ogg]",
        C3: "instruments/harp/C3.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
