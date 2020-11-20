import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Xylophone extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        C7: "instruments/xylophone/C7.[mp3|ogg]",
        G3: "instruments/xylophone/G3.[mp3|ogg]",
        G4: "instruments/xylophone/G4.[mp3|ogg]",
        G5: "instruments/xylophone/G5.[mp3|ogg]",
        G6: "instruments/xylophone/G6.[mp3|ogg]",
        C4: "instruments/xylophone/C4.[mp3|ogg]",
        C5: "instruments/xylophone/C5.[mp3|ogg]",
        C6: "instruments/xylophone/C6.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
