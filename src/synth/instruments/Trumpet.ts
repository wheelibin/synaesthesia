import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Trumpet extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        C5: "instruments/trumpet/C5.[mp3|ogg]",
        D4: "instruments/trumpet/D4.[mp3|ogg]",
        "D#3": "instruments/trumpet/Ds3.[mp3|ogg]",
        F2: "instruments/trumpet/F2.[mp3|ogg]",
        F3: "instruments/trumpet/F3.[mp3|ogg]",
        F4: "instruments/trumpet/F4.[mp3|ogg]",
        G3: "instruments/trumpet/G3.[mp3|ogg]",
        A2: "instruments/trumpet/A2.[mp3|ogg]",
        A4: "instruments/trumpet/A4.[mp3|ogg]",
        "A#3": "instruments/trumpet/As3.[mp3|ogg]",
        C3: "instruments/trumpet/C3.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
