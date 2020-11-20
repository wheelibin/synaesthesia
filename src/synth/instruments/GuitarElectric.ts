import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class GuitarElectric extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        "D#3": "instruments/guitar-electric/Ds3.[mp3|ogg]",
        "D#4": "instruments/guitar-electric/Ds4.[mp3|ogg]",
        "D#5": "instruments/guitar-electric/Ds5.[mp3|ogg]",
        E2: "instruments/guitar-electric/E2.[mp3|ogg]",
        "F#2": "instruments/guitar-electric/Fs2.[mp3|ogg]",
        "F#3": "instruments/guitar-electric/Fs3.[mp3|ogg]",
        "F#4": "instruments/guitar-electric/Fs4.[mp3|ogg]",
        "F#5": "instruments/guitar-electric/Fs5.[mp3|ogg]",
        A2: "instruments/guitar-electric/A2.[mp3|ogg]",
        A3: "instruments/guitar-electric/A3.[mp3|ogg]",
        A4: "instruments/guitar-electric/A4.[mp3|ogg]",
        A5: "instruments/guitar-electric/A5.[mp3|ogg]",
        C3: "instruments/guitar-electric/C3.[mp3|ogg]",
        C4: "instruments/guitar-electric/C4.[mp3|ogg]",
        C5: "instruments/guitar-electric/C5.[mp3|ogg]",
        C6: "instruments/guitar-electric/C6.[mp3|ogg]",
        "C#2": "instruments/guitar-electric/Cs2.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
