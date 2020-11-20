import * as utils from "./utils";

import { IInstrument } from "./instruments/IInstrument";

import { AcidSynth } from "./instruments/AcidSynth";
import { BassElectric } from "./instruments/BassElectric";
import { Bassoon } from "./instruments/Bassoon";
import { BassSynth } from "./instruments/BassSynth";
import { Cello } from "./instruments/Cello";
import { Clarinet } from "./instruments/Clarinet";
import { ContraBass } from "./instruments/ContraBass";
import { Flute } from "./instruments/Flute";
import { FrenchHorn } from "./instruments/FrenchHorn";
import { GuitarAcoustic } from "./instruments/GuitarAcoustic";
import { GuitarElectric } from "./instruments/GuitarElectric";
import { GuitarNylon } from "./instruments/GuitarNylon";
import { Harmonium } from "./instruments/Harmonium";
import { Harp } from "./instruments/Harp";
import { Organ } from "./instruments/Organ";
import { Piano } from "./instruments/Piano";
import { PluckedBass } from "./instruments/PluckedBass";
import { PolySynth } from "./instruments/PolySynth";
import { Saxophone } from "./instruments/Saxophone";
import { Trombone } from "./instruments/Trombone";
import { Trumpet } from "./instruments/Trumpet";
import { Tuba } from "./instruments/Tuba";
import { Violin } from "./instruments/Violin";
import { Xylophone } from "./instruments/Xylophone";

export interface IKit {
  bass: IInstrument;
  chord: IInstrument;
  motif: IInstrument;
  drums: boolean;
}

export class InstrumentSelector {
  private kits = [
    () => ({ bass: new Tuba({ volume: -13 }), chord: new Cello({ pan: -0.3 }), motif: new Clarinet({ pan: 0.3 }), drums: false }),
    () => ({ bass: new Tuba({ volume: -13 }), chord: new Cello(), motif: new Clarinet(), drums: false }),
    () => ({ bass: new Tuba({ volume: -13 }), chord: new Cello(), motif: new Violin(), drums: false }),
    () => ({ bass: new Cello({ attack: 0.2 }), chord: new Cello(), motif: new Violin(), drums: false }),
    () => ({ bass: new PluckedBass(), chord: new Piano(), motif: new AcidSynth(-30), drums: false }),
  ];

  public randomKit(): IKit {
    // const kit = utils.randomFromArray(this.kits)();
    // return kit;
    return this.kits[0]();
  }
}
