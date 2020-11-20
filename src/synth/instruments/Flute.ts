import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Flute extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        A5: "instruments/flute/A5.[mp3|ogg]",
        C3: "instruments/flute/C3.[mp3|ogg]",
        C4: "instruments/flute/C4.[mp3|ogg]",
        C5: "instruments/flute/C5.[mp3|ogg]",
        C6: "instruments/flute/C6.[mp3|ogg]",
        E3: "instruments/flute/E3.[mp3|ogg]",
        E4: "instruments/flute/E4.[mp3|ogg]",
        E5: "instruments/flute/E5.[mp3|ogg]",
        A3: "instruments/flute/A3.[mp3|ogg]",
        A4: "instruments/flute/A4.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
