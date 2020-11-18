import * as utils from "./utils";

import { BassElectric } from "./instruments/BassElectric";
import { Bassoon } from "./instruments/Bassoon";
import { Cello } from "./instruments/Cello";
import { Clarinet } from "./instruments/Clarinet";
import { ContraBass } from "./instruments/ContraBass";
import { Violin } from "./instruments/Violin";

import { AcidSynth } from "./instruments/AcidSynth";
import { BassSynth } from "./instruments/BassSynth";
import { PluckedBass } from "./instruments/PluckedBass";
import { PolySynth } from "./instruments/PolySynth";
import { IInstrument } from "./instruments/IInstrument";

import { Piano } from "./instruments/Piano";

export interface IKit {
  bass: IInstrument;
  chord: IInstrument;
  motif: IInstrument;
}

export class InstrumentSelector {
  private bassInstruments = [PluckedBass, BassElectric, Bassoon, Cello, ContraBass];
  private chordInstruments = [Piano];
  private motifInstruments = [Cello, Clarinet];

  private kits = [() => ({ bass: new PluckedBass(), chord: new Piano(), motif: new AcidSynth(-30) })];

  public randomKit(): IKit {
    const kit = utils.randomFromArray(this.kits)();
    return kit;
  }

  public randomBassInstrument(volume?: number): IInstrument {
    const instrument = utils.randomFromArray(this.bassInstruments);
    return new instrument(volume);
  }

  public randomChordInstrument(volume?: number): IInstrument {
    const instrument = utils.randomFromArray(this.chordInstruments);
    return new instrument(volume);
  }

  public randomMotifInstrument(volume?: number): IInstrument {
    const instrument = utils.randomFromArray(this.motifInstruments);
    return new instrument(volume);
  }
}
