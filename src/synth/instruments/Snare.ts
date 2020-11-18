import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Snare extends Sample implements IInstrument {
  constructor() {
    super({ C3: "snare1.wav" });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
