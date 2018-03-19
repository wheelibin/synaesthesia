import Tone from "tone";
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
      new Tone.Synth({
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
      20
    );
  }
}

// export const fastAttackBass = () => {
//   const bassSynth = new Tone.Synth({
//     oscillator: {
//       type: "square4"
//     },
//     envelope: {
//       attack: 0.02,
//       decay: 0,
//       sustain: 1,
//       release: 1
//     }
//   }).toMaster();
//   bassSynth.volume.value = 24;
//   return bassSynth;
// };

export const squareBass = harmonics => {
  const bassSynth = new Tone.Synth({
    oscillator: {
      type: "square" + harmonics
    },
    envelope: {
      attack: "0:2",
      decay: 0.1,
      sustain: 1,
      release: 3
    }
  }).toMaster();
  bassSynth.volume.value = 24;
  return bassSynth;
};
