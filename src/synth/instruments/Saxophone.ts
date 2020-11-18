import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Saxophone extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        "D#4": "instruments/saxophone/Ds4.[mp3|ogg]",
        E2: "instruments/saxophone/E2.[mp3|ogg]",
        E3: "instruments/saxophone/E3.[mp3|ogg]",
        E4: "instruments/saxophone/E4.[mp3|ogg]",
        F2: "instruments/saxophone/F2.[mp3|ogg]",
        F3: "instruments/saxophone/F3.[mp3|ogg]",
        F4: "instruments/saxophone/F4.[mp3|ogg]",
        "F#2": "instruments/saxophone/Fs2.[mp3|ogg]",
        "F#3": "instruments/saxophone/Fs3.[mp3|ogg]",
        "F#4": "instruments/saxophone/Fs4.[mp3|ogg]",
        G2: "instruments/saxophone/G2.[mp3|ogg]",
        G3: "instruments/saxophone/G3.[mp3|ogg]",
        G4: "instruments/saxophone/G4.[mp3|ogg]",
        "G#2": "instruments/saxophone/Gs2.[mp3|ogg]",
        "G#3": "instruments/saxophone/Gs3.[mp3|ogg]",
        "G#4": "instruments/saxophone/Gs4.[mp3|ogg]",
        A3: "instruments/saxophone/A3.[mp3|ogg]",
        A4: "instruments/saxophone/A4.[mp3|ogg]",
        "A#2": "instruments/saxophone/As2.[mp3|ogg]",
        "A#3": "instruments/saxophone/As3.[mp3|ogg]",
        B2: "instruments/saxophone/B2.[mp3|ogg]",
        B3: "instruments/saxophone/B3.[mp3|ogg]",
        C3: "instruments/saxophone/C3.[mp3|ogg]",
        C4: "instruments/saxophone/C4.[mp3|ogg]",
        "C#2": "instruments/saxophone/Cs2.[mp3|ogg]",
        "C#3": "instruments/saxophone/Cs3.[mp3|ogg]",
        "C#4": "instruments/saxophone/Cs4.[mp3|ogg]",
        D2: "instruments/saxophone/D2.[mp3|ogg]",
        D3: "instruments/saxophone/D3.[mp3|ogg]",
        D4: "instruments/saxophone/D4.[mp3|ogg]",
        "D#2": "instruments/saxophone/Ds2.[mp3|ogg]",
        "D#3": "instruments/saxophone/Ds3.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
