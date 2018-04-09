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

  const oscTypes = ["sine", "triangle", "square", "sawtooth", "pwm", "pulse"];

  const oscillators = [
    new Tone.OmniOscillator("D1", utils.randomFromArray(oscTypes)).toMaster().start(),
    new Tone.OmniOscillator("D2", utils.randomFromArray(oscTypes)).toMaster().start(),
    new Tone.OmniOscillator("F2", utils.randomFromArray(oscTypes)).toMaster().start(),
    new Tone.OmniOscillator("A2", utils.randomFromArray(oscTypes)).toMaster().start(),
    new Tone.OmniOscillator("C3", utils.randomFromArray(oscTypes)).toMaster().start(),
    new Tone.OmniOscillator("E3", utils.randomFromArray(oscTypes)).toMaster().start()
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
    osc.frequencyChangeActive = true;
    osc.volumeChangeActive = true;
  });

  const loop = new Tone.Loop(() => {
    const frequencyChangeOscillator = utils.randomFromArray(oscillators);
    const volumeChangeOscillator = utils.randomFromArray(oscillators);

    //frequency change
    if (frequencyChangeOscillator.frequencyChangeActive) {
      const transposeAmount = 1; // utils.randomFromArray([5, 7]);
      frequencyChangeOscillator.frequency.exponentialRampToValueAtTime(
        Tone.Frequency(frequencyChangeOscillator.frequency.value).transpose(transposeAmount),
        "+0:2:0"
      );
      frequencyChangeOscillator.transposeAmount = transposeAmount;
    } else {
      frequencyChangeOscillator.frequency.exponentialRampToValueAtTime(
        Tone.Frequency(frequencyChangeOscillator.frequency.value).transpose(frequencyChangeOscillator.transposeAmount * -1),
        "+0:2:0"
      );
    }
    frequencyChangeOscillator.frequencyChangeActive = !frequencyChangeOscillator.frequencyChangeActive;

    //volume change
    //on each loop lower the volume of one of the oscillators

    //reset all back to original volume
    oscillators.forEach(osc => {
      osc.volume.exponentialRampToValueAtTime(0, "+0:2:0");
    });

    //change the randomly selected one only
    volumeChangeOscillator.volume.exponentialRampToValueAtTime(-6, "+0:2:0");

    // if (volumeChangeOscillator.volumeChangeActive) {
    //   volumeChangeOscillator.volume.exponentialRampToValueAtTime(-6, "+0:2:0");
    // } else {
    //   volumeChangeOscillator.volume.exponentialRampToValueAtTime(0, "+0:2:0");
    // }
    // volumeChangeOscillator.volumeChangeActive = !volumeChangeOscillator.volumeChangeActive;
  }, "1m");
  loop.start("1m");

  return {};
};
