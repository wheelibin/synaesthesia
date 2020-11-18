import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class GuitarNylon extends Sample implements IInstrument {
  constructor(volume: number) {
    super(
      {
        "F#2": "instruments/guitar-nylon/Fs2.[mp3|ogg]",
        "F#3": "instruments/guitar-nylon/Fs3.[mp3|ogg]",
        "F#4": "instruments/guitar-nylon/Fs4.[mp3|ogg]",
        "F#5": "instruments/guitar-nylon/Fs5.[mp3|ogg]",
        G3: "instruments/guitar-nylon/G3.[mp3|ogg]",
        G5: "instruments/guitar-nylon/G3.[mp3|ogg]",
        "G#2": "instruments/guitar-nylon/Gs2.[mp3|ogg]",
        "G#4": "instruments/guitar-nylon/Gs4.[mp3|ogg]",
        "G#5": "instruments/guitar-nylon/Gs5.[mp3|ogg]",
        A2: "instruments/guitar-nylon/A2.[mp3|ogg]",
        A3: "instruments/guitar-nylon/A3.[mp3|ogg]",
        A4: "instruments/guitar-nylon/A4.[mp3|ogg]",
        A5: "instruments/guitar-nylon/A5.[mp3|ogg]",
        "A#5": "instruments/guitar-nylon/As5.[mp3|ogg]",
        B1: "instruments/guitar-nylon/B1.[mp3|ogg]",
        B2: "instruments/guitar-nylon/B2.[mp3|ogg]",
        B3: "instruments/guitar-nylon/B3.[mp3|ogg]",
        B4: "instruments/guitar-nylon/B4.[mp3|ogg]",
        "C#3": "instruments/guitar-nylon/Cs3.[mp3|ogg]",
        "C#4": "instruments/guitar-nylon/Cs4.[mp3|ogg]",
        "C#5": "instruments/guitar-nylon/Cs5.[mp3|ogg]",
        D2: "instruments/guitar-nylon/D2.[mp3|ogg]",
        D3: "instruments/guitar-nylon/D3.[mp3|ogg]",
        D5: "instruments/guitar-nylon/D5.[mp3|ogg]",
        "D#4": "instruments/guitar-nylon/Ds4.[mp3|ogg]",
        E2: "instruments/guitar-nylon/E2.[mp3|ogg]",
        E3: "instruments/guitar-nylon/E3.[mp3|ogg]",
        E4: "instruments/guitar-nylon/E4.[mp3|ogg]",
        E5: "instruments/guitar-nylon/E5.[mp3|ogg]",
      },
      volume
    );
  }
  trigger({ note, duration, time }: ITriggerParams): void {
    super.triggerAttackRelease({ note, duration, time });
  }
}
