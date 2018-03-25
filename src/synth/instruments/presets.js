// http://tonejs.github.io/Presets/

import Tone from "tone";
import { Instrument } from "./instrument";

export class Tiny extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
    this.synth.set({
      harmonicity: 2,
      oscillator: {
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 1.01
      },
      envelope: {
        attack: 0.006,
        decay: 4,
        sustain: 0.04,
        release: 1.2
      },
      modulation: {
        volume: 13,
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 12
      },
      modulationEnvelope: {
        attack: 0.006,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4
      }
    });
    this.synth.volume.value = 10;

    this.synth.send("reverb", -12);
  }
}

export class AM_Tiny extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
    this.synth.set({
      harmonicity: 2,
      oscillator: {
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 1.01
      },
      envelope: {
        attack: 0.006,
        decay: 4,
        sustain: 0.04,
        release: 1.2
      },
      modulation: {
        volume: 13,
        type: "amsine2",
        modulationType: "sine",
        harmonicity: 12
      },
      modulationEnvelope: {
        attack: 0.006,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4
      }
    });
    this.synth.volume.value = 10;

    this.synth.send("reverb", -12);
  }
}

export class FM_ElectricCello extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
    this.synth.set({
      harmonicity: 3.01,
      modulationIndex: 14,
      oscillator: {
        type: "triangle"
      },
      envelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.1,
        release: 1.2
      },
      modulation: {
        type: "square"
      },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.2,
        release: 0.1
      }
    });
    this.synth.volume.value = 10;

    this.synth.send("reverb", -12);
  }
}

export class Kalimba extends Instrument {
  constructor() {
    super(
      new Tone.Synth({
        harmonicity: 8,
        modulationIndex: 2,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.001,
          decay: 2,
          sustain: 0.1,
          release: 2
        },
        modulation: {
          type: "square"
        },
        modulationEnvelope: {
          attack: 0.002,
          decay: 0.2,
          sustain: 0,
          release: 0.2
        }
      }),
      18
    );
  }
}

export class BassGuitar extends Instrument {
  constructor() {
    super(
      new Tone.Synth({
        oscillator: {
          type: "fmsquare5",
          modulationType: "triangle",
          modulationIndex: 2,
          harmonicity: 0.501
        },
        filter: {
          Q: 1,
          type: "lowpass",
          rolloff: -24
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.4,
          release: 2
        },
        filterEnvelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.8,
          release: 1.5,
          baseFrequency: 50,
          octaves: 4.4
        }
      }),
      18
    );
  }
}

export class Bassy extends Instrument {
  constructor() {
    super(
      new Tone.Synth({
        portamento: 0.08,
        oscillator: {
          partials: [2, 1, 3, 2, 0.4]
        },
        filter: {
          Q: 4,
          type: "lowpass",
          rolloff: -48
        },
        envelope: {
          attack: 0.04,
          decay: 0.06,
          sustain: 0.4,
          release: 1
        },
        filterEnvelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.6,
          release: 1.5,
          baseFrequency: 50,
          octaves: 3.4
        }
      }),
      18
    );
  }
}
export class Coolguy extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
    this.synth.set({
      oscillator: {
        type: "pwm",
        modulationFrequency: 1
      },
      filter: {
        Q: 6,
        rolloff: -24
      },
      envelope: {
        attack: 0.025,
        decay: 0.3,
        sustain: 0.9,
        release: 2
      },
      filterEnvelope: {
        attack: 0.245,
        decay: 0.131,
        sustain: 0.5,
        release: 2,
        baseFrequency: 20,
        octaves: 7.2,
        exponent: 2
      }
    });
    this.synth.volume.value = 10;

    this.synth.send("reverb", -12);
  }
}

export class AlienChorus extends Instrument {
  constructor() {
    super(new Tone.PolySynth(6, Tone.Synth), 24);
    this.synth.set({
      oscillator: {
        type: "fatsine4",
        spread: 60,
        count: 10
      },
      envelope: {
        attack: 0.4,
        decay: 0.01,
        sustain: 1,
        attackCurve: "sine",
        releaseCurve: "sine",
        release: 0.4
      }
    });
    this.synth.volume.value = 10;

    this.synth.send("reverb", -12);
  }
}
