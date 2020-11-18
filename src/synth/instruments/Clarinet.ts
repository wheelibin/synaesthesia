import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Clarinet extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        D3: "instruments/clarinet/D3.[mp3|ogg]",
        D4: "instruments/clarinet/D4.[mp3|ogg]",
        D5: "instruments/clarinet/D5.[mp3|ogg]",
        F2: "instruments/clarinet/F2.[mp3|ogg]",
        F3: "instruments/clarinet/F3.[mp3|ogg]",
        F4: "instruments/clarinet/F4.[mp3|ogg]",
        "F#5": "instruments/clarinet/Fs5.[mp3|ogg]",
        "A#2": "instruments/clarinet/As2.[mp3|ogg]",
        "A#3": "instruments/clarinet/As3.[mp3|ogg]",
        "A#4": "instruments/clarinet/As4.[mp3|ogg]",
        D2: "instruments/clarinet/D2.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
