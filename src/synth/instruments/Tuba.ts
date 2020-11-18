import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Tuba extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        "A#1": "instruments/tuba/As1.[mp3|ogg]",
        "A#2": "instruments/tuba/As2.[mp3|ogg]",
        D2: "instruments/tuba/D2.[mp3|ogg]",
        D3: "instruments/tuba/D3.[mp3|ogg]",
        "D#1": "instruments/tuba/Ds1.[mp3|ogg]",
        F0: "instruments/tuba/F0.[mp3|ogg]",
        F1: "instruments/tuba/F1.[mp3|ogg]",
        F2: "instruments/tuba/F2.[mp3|ogg]",
        "A#0": "instruments/tuba/As0.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
