import Tone from "tone";
import * as utils from "../../utils";
// import * as scales from "../scales";

// const fmOscillator = note => {
//   return new Tone.FMOscillator(note, "sine", "square").toMaster().start();
// };

export const play = () => {
  // const rootFreq = Tone.Frequency(scales.getRandomRootNote() + "1");
  // const harmonisedFreqs = Tone.Frequency(rootFreq).harmonize([3, 7]);

  // const oscillators = [];
  // oscillators.push(fmOscillator(rootFreq));
  // oscillators.push(fmOscillator(Tone.Frequency(rootFreq).transpose(12)));
  // oscillators.push(fmOscillator(Tone.Frequency(rootFreq).transpose(24)));
  // oscillators.push(fmOscillator(Tone.Frequency(harmonisedFreqs[0]).transpose(12)));
  // oscillators.push(fmOscillator(Tone.Frequency(harmonisedFreqs[1]).transpose(12)));

  const oscillators = [
    // new Tone.FMOscillator("D1", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("D2", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("D3", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("D4", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("F2", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("F3", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("A2", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("A3", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("C3", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("C4", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("E3", "sine", "square").toMaster().start(),
    // new Tone.FMOscillator("E4", "sine", "square").toMaster().start()
    new Tone.FMOscillator("D1", "sine", "square").toMaster().start(),
    new Tone.FMOscillator("D2", "sine", "square").toMaster().start(),
    new Tone.FMOscillator("F2", "sine", "square").toMaster().start(),
    new Tone.FMOscillator("A2", "sine", "square").toMaster().start(),
    new Tone.FMOscillator("C3", "sine", "square").toMaster().start(),
    new Tone.FMOscillator("E3", "sine", "square").toMaster().start()
  ];

  const chorus = new Tone.Chorus(2, 2.5, 0.5).toMaster();
  const reverb = new Tone.Freeverb().toMaster();
  const phaser = new Tone.Phaser(0.2).toMaster();
  const autoWah = new Tone.AutoWah().toMaster();
  // const tremolo = new Tone.Tremolo(1, 0.5).toMaster().start();
  // const autoFilter = new Tone.AutoFilter("3m").toMaster().start();

  oscillators.forEach(osc => {
    //osc.connect(tremolo);
    osc.connect(chorus);
    osc.connect(phaser);
    osc.connect(autoWah);
    osc.connect(reverb);
    //osc.connect(autoFilter);
    osc.on = true;
  });

  const loop = new Tone.Loop(() => {
    const randomOsc = utils.randomFromArray(oscillators);

    let newFreq;
    if (randomOsc.on) {
      const transposeAmount = utils.randomFromArray([5, 7]);
      newFreq = Tone.Frequency(randomOsc.frequency.value).transpose(transposeAmount);
      randomOsc.frequency.exponentialRampToValueAtTime(newFreq, "+0:2:0");
      randomOsc.transposeAmount = transposeAmount;
    } else {
      newFreq = Tone.Frequency(randomOsc.frequency.value).transpose(randomOsc.transposeAmount * -1);
      randomOsc.frequency.exponentialRampToValueAtTime(newFreq, "+0:2:0");
    }
    randomOsc.on = !randomOsc.on;
  }, "8m");
  loop.start("8m");

  return {};
};
