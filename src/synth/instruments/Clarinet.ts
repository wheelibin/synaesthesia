import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Clarinet extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        D3: "instruments/clarinet/D3.[mp3|ogg]",
        D4: "instruments/clarinet/D4.[mp3|ogg]",
        D5: "instruments/clarinet/D5.[mp3|ogg]",
        F2: "instruments/clarinet/F2.[mp3|ogg]",
        F3: "instruments/clarinet/F3.[mp3|ogg]",
        F4: "instruments/clarinet/F4.[mp3|ogg]",
        "F#5": "instruments/clarinet/Fs5.[mp3|ogg]",
        "A#2": "instruments/clarinet/As2.[mp3|ogg]",
        "A#3": "instruments/clarinet/As3.[mp3|ogg]",
        "A#4": "instruments/clarinet/As4.[mp3|ogg]",
        D2: "instruments/clarinet/D2.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
