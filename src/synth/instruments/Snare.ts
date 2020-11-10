import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class Snare extends Sample implements IInstrument {
  constructor() {
    super("snare1.wav");
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
