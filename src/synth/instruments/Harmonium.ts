import { IInstrument, IInstrumentParams, ITriggerParams } from "./IInstrument";
import { Sampler } from "./Sampler";

export class Harmonium extends Sampler implements IInstrument {
  constructor(params: IInstrumentParams = {}) {
    super({
      ...params,
      filenames: {
        C2: "instruments/harmonium/C2.[mp3|ogg]",
        C3: "instruments/harmonium/C3.[mp3|ogg]",
        C4: "instruments/harmonium/C4.[mp3|ogg]",
        C5: "instruments/harmonium/C5.[mp3|ogg]",
        "C#2": "instruments/harmonium/Cs2.[mp3|ogg]",
        "C#3": "instruments/harmonium/Cs3.[mp3|ogg]",
        "C#4": "instruments/harmonium/Cs4.[mp3|ogg]",
        "C#5": "instruments/harmonium/Cs5.[mp3|ogg]",
        D2: "instruments/harmonium/D2.[mp3|ogg]",
        D3: "instruments/harmonium/D3.[mp3|ogg]",
        D4: "instruments/harmonium/D4.[mp3|ogg]",
        D5: "instruments/harmonium/D5.[mp3|ogg]",
        "D#2": "instruments/harmonium/Ds2.[mp3|ogg]",
        "D#3": "instruments/harmonium/Ds3.[mp3|ogg]",
        "D#4": "instruments/harmonium/Ds4.[mp3|ogg]",
        E2: "instruments/harmonium/E2.[mp3|ogg]",
        E3: "instruments/harmonium/E3.[mp3|ogg]",
        E4: "instruments/harmonium/E4.[mp3|ogg]",
        F2: "instruments/harmonium/F2.[mp3|ogg]",
        F3: "instruments/harmonium/F3.[mp3|ogg]",
        F4: "instruments/harmonium/F4.[mp3|ogg]",
        "F#2": "instruments/harmonium/Fs2.[mp3|ogg]",
        "F#3": "instruments/harmonium/Fs3.[mp3|ogg]",
        G2: "instruments/harmonium/G2.[mp3|ogg]",
        G3: "instruments/harmonium/G3.[mp3|ogg]",
        G4: "instruments/harmonium/G4.[mp3|ogg]",
        "G#2": "instruments/harmonium/Gs2.[mp3|ogg]",
        "G#3": "instruments/harmonium/Gs3.[mp3|ogg]",
        "G#4": "instruments/harmonium/Gs4.[mp3|ogg]",
        A2: "instruments/harmonium/A2.[mp3|ogg]",
        A3: "instruments/harmonium/A3.[mp3|ogg]",
        A4: "instruments/harmonium/A4.[mp3|ogg]",
        "A#2": "instruments/harmonium/As2.[mp3|ogg]",
        "A#3": "instruments/harmonium/As3.[mp3|ogg]",
        "A#4": "instruments/harmonium/As4.[mp3|ogg]",
      },
    });
  }
  trigger(params: ITriggerParams): void {
    super.triggerAttackRelease(params);
  }
}
