import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class BassElectric extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        "A#2": "instruments/bass-electric/As2.[mp3|ogg]",
        "A#3": "instruments/bass-electric/As3.[mp3|ogg]",
        "A#4": "instruments/bass-electric/As4.[mp3|ogg]",
        "A#5": "instruments/bass-electric/As5.[mp3|ogg]",
        "C#2": "instruments/bass-electric/Cs2.[mp3|ogg]",
        "C#3": "instruments/bass-electric/Cs3.[mp3|ogg]",
        "C#4": "instruments/bass-electric/Cs4.[mp3|ogg]",
        "C#5": "instruments/bass-electric/Cs5.[mp3|ogg]",
        E2: "instruments/bass-electric/E2.[mp3|ogg]",
        E3: "instruments/bass-electric/E3.[mp3|ogg]",
        E4: "instruments/bass-electric/E4.[mp3|ogg]",
        E5: "instruments/bass-electric/E5.[mp3|ogg]",
        G2: "instruments/bass-electric/G2.[mp3|ogg]",
        G3: "instruments/bass-electric/G3.[mp3|ogg]",
        G4: "instruments/bass-electric/G4.[mp3|ogg]",
        G5: "instruments/bass-electric/G5.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
