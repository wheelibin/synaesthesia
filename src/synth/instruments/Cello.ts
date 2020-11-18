import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Cello extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        E3: "instruments/cello/E3.[mp3|ogg]",
        E4: "instruments/cello/E4.[mp3|ogg]",
        F2: "instruments/cello/F2.[mp3|ogg]",
        F3: "instruments/cello/F3.[mp3|ogg]",
        F4: "instruments/cello/F4.[mp3|ogg]",
        "F#3": "instruments/cello/Fs3.[mp3|ogg]",
        "F#4": "instruments/cello/Fs4.[mp3|ogg]",
        G2: "instruments/cello/G2.[mp3|ogg]",
        G3: "instruments/cello/G3.[mp3|ogg]",
        G4: "instruments/cello/G4.[mp3|ogg]",
        "G#2": "instruments/cello/Gs2.[mp3|ogg]",
        "G#3": "instruments/cello/Gs3.[mp3|ogg]",
        "G#4": "instruments/cello/Gs4.[mp3|ogg]",
        A2: "instruments/cello/A2.[mp3|ogg]",
        A3: "instruments/cello/A3.[mp3|ogg]",
        A4: "instruments/cello/A4.[mp3|ogg]",
        "A#2": "instruments/cello/As2.[mp3|ogg]",
        "A#3": "instruments/cello/As3.[mp3|ogg]",
        "A#4": "instruments/cello/As4.[mp3|ogg]",
        B2: "instruments/cello/B2.[mp3|ogg]",
        B3: "instruments/cello/B3.[mp3|ogg]",
        B4: "instruments/cello/B4.[mp3|ogg]",
        C2: "instruments/cello/C2.[mp3|ogg]",
        C3: "instruments/cello/C3.[mp3|ogg]",
        C4: "instruments/cello/C4.[mp3|ogg]",
        C5: "instruments/cello/C5.[mp3|ogg]",
        "C#3": "instruments/cello/Cs3.[mp3|ogg]",
        "C#4": "instruments/cello/Cs4.[mp3|ogg]",
        D2: "instruments/cello/D2.[mp3|ogg]",
        D3: "instruments/cello/D3.[mp3|ogg]",
        D4: "instruments/cello/D4.[mp3|ogg]",
        "D#2": "instruments/cello/Ds2.[mp3|ogg]",
        "D#3": "instruments/cello/Ds3.[mp3|ogg]",
        "D#4": "instruments/cello/Ds4.[mp3|ogg]",
        E2: "instruments/cello/E2.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
