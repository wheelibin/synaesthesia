import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class HiHatClosed extends Sample implements IInstrument {
  constructor() {
    super("hatcl1.wav");
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
