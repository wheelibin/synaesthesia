import { Synth, Compressor } from "tone";
import { Instrument } from "./instrument";

export const subBass = () => {
  return squareBass(2);
};

export const softSquareBass = () => {
  return squareBass(6);
};

export class FastAttackSquare extends Instrument {
  constructor() {
    super(
      new Synth({
        oscillator: {
          type: "square4"
        },
        envelope: {
          attack: 0.02,
          decay: 0,
          sustain: 1,
          release: 1
        }
      }),
      22
    );
    var comp = new Compressor(-30, 12).toDestination();
    this.synth.connect(comp);
  }
}

export class SawTooth extends Instrument {
  constructor() {
    super(
      new Synth({
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.02,
          decay: 0.2,
          sustain: 0.8,
          release: 1
        }
      }),
      18
    );
  }
}

export const squareBass = harmonics => {
  const bassSynth = new Synth({
    oscillator: {
      type: "square" + harmonics
    },
    envelope: {
      attack: "0:2",
      decay: 0.1,
      sustain: 1,
      release: 3
    }
  }).toDestination();
  bassSynth.volume.value = 24;
  return bassSynth;
};
