import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class HiHatOpen extends Sample implements IInstrument {
  constructor() {
    super({ C3: "hatop1.wav" });
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
