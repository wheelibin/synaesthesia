import { IInstrument, ITriggerParams } from "./IInstrument";
import { Sample } from "./Sample";

export class KickDrum extends Sample implements IInstrument {
  constructor() {
    super("kick1.wav");
  }
  trigger({ time }: ITriggerParams): void {
    super.trigger({ time });
  }
}
