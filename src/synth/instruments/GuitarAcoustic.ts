import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class GuitarAcoustic extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        F3: "instruments/guitar-acoustic/F3.[mp3|ogg]",
        "F#1": "instruments/guitar-acoustic/Fs1.[mp3|ogg]",
        "F#2": "instruments/guitar-acoustic/Fs2.[mp3|ogg]",
        "F#3": "instruments/guitar-acoustic/Fs3.[mp3|ogg]",
        G1: "instruments/guitar-acoustic/G1.[mp3|ogg]",
        G2: "instruments/guitar-acoustic/G2.[mp3|ogg]",
        G3: "instruments/guitar-acoustic/G3.[mp3|ogg]",
        "G#1": "instruments/guitar-acoustic/Gs1.[mp3|ogg]",
        "G#2": "instruments/guitar-acoustic/Gs2.[mp3|ogg]",
        "G#3": "instruments/guitar-acoustic/Gs3.[mp3|ogg]",
        A1: "instruments/guitar-acoustic/A1.[mp3|ogg]",
        A2: "instruments/guitar-acoustic/A2.[mp3|ogg]",
        A3: "instruments/guitar-acoustic/A3.[mp3|ogg]",
        "A#1": "instruments/guitar-acoustic/As1.[mp3|ogg]",
        "A#2": "instruments/guitar-acoustic/As2.[mp3|ogg]",
        "A#3": "instruments/guitar-acoustic/As3.[mp3|ogg]",
        B1: "instruments/guitar-acoustic/B1.[mp3|ogg]",
        B2: "instruments/guitar-acoustic/B2.[mp3|ogg]",
        B3: "instruments/guitar-acoustic/B3.[mp3|ogg]",
        C2: "instruments/guitar-acoustic/C2.[mp3|ogg]",
        C3: "instruments/guitar-acoustic/C3.[mp3|ogg]",
        C4: "instruments/guitar-acoustic/C4.[mp3|ogg]",
        "C#2": "instruments/guitar-acoustic/Cs2.[mp3|ogg]",
        "C#3": "instruments/guitar-acoustic/Cs3.[mp3|ogg]",
        "C#4": "instruments/guitar-acoustic/Cs4.[mp3|ogg]",
        D1: "instruments/guitar-acoustic/D1.[mp3|ogg]",
        D2: "instruments/guitar-acoustic/D2.[mp3|ogg]",
        D3: "instruments/guitar-acoustic/D3.[mp3|ogg]",
        D4: "instruments/guitar-acoustic/D4.[mp3|ogg]",
        "D#1": "instruments/guitar-acoustic/Ds1.[mp3|ogg]",
        "D#2": "instruments/guitar-acoustic/Ds2.[mp3|ogg]",
        "D#3": "instruments/guitar-acoustic/Ds3.[mp3|ogg]",
        E1: "instruments/guitar-acoustic/E1.[mp3|ogg]",
        E2: "instruments/guitar-acoustic/E2.[mp3|ogg]",
        E3: "instruments/guitar-acoustic/E3.[mp3|ogg]",
        F1: "instruments/guitar-acoustic/F1.[mp3|ogg]",
        F2: "instruments/guitar-acoustic/F2.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
