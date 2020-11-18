import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Flute extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        A5: "instruments/flute/A5.[mp3|ogg]",
        C3: "instruments/flute/C3.[mp3|ogg]",
        C4: "instruments/flute/C4.[mp3|ogg]",
        C5: "instruments/flute/C5.[mp3|ogg]",
        C6: "instruments/flute/C6.[mp3|ogg]",
        E3: "instruments/flute/E3.[mp3|ogg]",
        E4: "instruments/flute/E4.[mp3|ogg]",
        E5: "instruments/flute/E5.[mp3|ogg]",
        A3: "instruments/flute/A3.[mp3|ogg]",
        A4: "instruments/flute/A4.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
