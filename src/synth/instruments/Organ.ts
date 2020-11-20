import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Organ extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        C3: "instruments/organ/C3.[mp3|ogg]",
        C4: "instruments/organ/C4.[mp3|ogg]",
        C5: "instruments/organ/C5.[mp3|ogg]",
        C6: "instruments/organ/C6.[mp3|ogg]",
        "D#1": "instruments/organ/Ds1.[mp3|ogg]",
        "D#2": "instruments/organ/Ds2.[mp3|ogg]",
        "D#3": "instruments/organ/Ds3.[mp3|ogg]",
        "D#4": "instruments/organ/Ds4.[mp3|ogg]",
        "D#5": "instruments/organ/Ds5.[mp3|ogg]",
        "F#1": "instruments/organ/Fs1.[mp3|ogg]",
        "F#2": "instruments/organ/Fs2.[mp3|ogg]",
        "F#3": "instruments/organ/Fs3.[mp3|ogg]",
        "F#4": "instruments/organ/Fs4.[mp3|ogg]",
        "F#5": "instruments/organ/Fs5.[mp3|ogg]",
        A1: "instruments/organ/A1.[mp3|ogg]",
        A2: "instruments/organ/A2.[mp3|ogg]",
        A3: "instruments/organ/A3.[mp3|ogg]",
        A4: "instruments/organ/A4.[mp3|ogg]",
        A5: "instruments/organ/A5.[mp3|ogg]",
        C1: "instruments/organ/C1.[mp3|ogg]",
        C2: "instruments/organ/C2.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
