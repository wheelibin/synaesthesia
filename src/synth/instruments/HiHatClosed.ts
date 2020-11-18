import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class HiHatClosed extends Sample implements IInstrument {
  constructor() {
    super({ C3: "hatcl1.wav" });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
