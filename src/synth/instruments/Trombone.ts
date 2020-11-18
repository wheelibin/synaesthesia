import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Trombone extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        "A#2": "instruments/trombone/As2.[mp3|ogg]",
        C2: "instruments/trombone/C2.[mp3|ogg]",
        C3: "instruments/trombone/C3.[mp3|ogg]",
        "C#1": "instruments/trombone/Cs1.[mp3|ogg]",
        "C#3": "instruments/trombone/Cs3.[mp3|ogg]",
        D2: "instruments/trombone/D2.[mp3|ogg]",
        D3: "instruments/trombone/D3.[mp3|ogg]",
        "D#1": "instruments/trombone/Ds1.[mp3|ogg]",
        "D#2": "instruments/trombone/Ds2.[mp3|ogg]",
        "D#3": "instruments/trombone/Ds3.[mp3|ogg]",
        F1: "instruments/trombone/F1.[mp3|ogg]",
        F2: "instruments/trombone/F2.[mp3|ogg]",
        F3: "instruments/trombone/F3.[mp3|ogg]",
        "G#1": "instruments/trombone/Gs1.[mp3|ogg]",
        "G#2": "instruments/trombone/Gs2.[mp3|ogg]",
        "A#0": "instruments/trombone/As0.[mp3|ogg]",
        "A#1": "instruments/trombone/As1.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
