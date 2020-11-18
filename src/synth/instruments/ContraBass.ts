import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class ContraBass extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        C1: "instruments/contrabass/C1.[mp3|ogg]",
        "C#2": "instruments/contrabass/Cs2.[mp3|ogg]",
        D1: "instruments/contrabass/D1.[mp3|ogg]",
        E1: "instruments/contrabass/E1.[mp3|ogg]",
        E2: "instruments/contrabass/E2.[mp3|ogg]",
        "F#0": "instruments/contrabass/Fs0.[mp3|ogg]",
        "F#1": "instruments/contrabass/Fs1.[mp3|ogg]",
        G0: "instruments/contrabass/G0.[mp3|ogg]",
        "G#1": "instruments/contrabass/Gs1.[mp3|ogg]",
        "G#2": "instruments/contrabass/Gs2.[mp3|ogg]",
        A1: "instruments/contrabass/A1.[mp3|ogg]",
        "A#0": "instruments/contrabass/As0.[mp3|ogg]",
        B2: "instruments/contrabass/B2.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
