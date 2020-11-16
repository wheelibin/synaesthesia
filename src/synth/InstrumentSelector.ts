import * as utils from "./utils";

import { AcidSynth } from "./instruments/AcidSynth";
import { BassSynth } from "./instruments/BassSynth";
import { PluckedBass } from "./instruments/PluckedBass";
import { PolySynth } from "./instruments/PolySynth";
import { IInstrument } from "./instruments/IInstrument";
import { Piano } from "./instruments/Piano";

export class InstrumentSelector {
  // private bassInstruments = [AcidSynth, BassSynth, PluckedBass];
  // private chordInstruments = [Piano, PolySynth];
  private bassInstruments = [PluckedBass];
  private chordInstruments = [Piano];

  public randomBassInstrument(volume?: number): IInstrument {
    const i = utils.randomFromArray(this.bassInstruments);
    return new i(volume);
  }

  public randomChordInstrument(volume?: number): IInstrument {
    const i = utils.randomFromArray(this.chordInstruments);
    return new i(volume);
  }
}
