import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Violin extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      attack: 2,
      stopActiveNotesOnTrigger: true,
      filenames: {
        A3: "instruments/violin/A3.[mp3|ogg]",
        A4: "instruments/violin/A4.[mp3|ogg]",
        A5: "instruments/violin/A5.[mp3|ogg]",
        A6: "instruments/violin/A6.[mp3|ogg]",
        C4: "instruments/violin/C4.[mp3|ogg]",
        C5: "instruments/violin/C5.[mp3|ogg]",
        C6: "instruments/violin/C6.[mp3|ogg]",
        C7: "instruments/violin/C7.[mp3|ogg]",
        E4: "instruments/violin/E4.[mp3|ogg]",
        E5: "instruments/violin/E5.[mp3|ogg]",
        E6: "instruments/violin/E6.[mp3|ogg]",
        G4: "instruments/violin/G4.[mp3|ogg]",
        G5: "instruments/violin/G5.[mp3|ogg]",
        G6: "instruments/violin/G6.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
