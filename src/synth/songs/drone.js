import Tone from "tone";
import * as utils from "../../utils";
import * as scales from "../scales";
import instruments from "../instruments";

const fmOscillator = (note, volume = 0) => {
  const osc = new Tone.FMOscillator(note, "sine", "square").toMaster().start();
  osc.volume.value = volume;
  return osc;
};

export const play = () => {
  const config = {
    lowestOscVolume: -50,
    changeFrequencyInterval: "4m",
    changeVolumeInterval: "3m",
    bassInterval: "4m",
    harmonyInterval: "6m"
  };

  const rootFreq = Tone.Frequency(scales.getRandomRootNote() + "0");

  const oscRoot = fmOscillator(rootFreq);
  const oscRootO2 = fmOscillator(Tone.Frequency(rootFreq).transpose(12));
  const oscRootO3 = fmOscillator(Tone.Frequency(rootFreq).transpose(24));

  const masterScale = scales.getRandomScaleType();
  const oscScale = scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 2, 3);

  let oscillatorsWithEffects = [];
  let oscillatorsWithFrequencyChange = [];
  let oscillatorsWithVolumeChange = [];
  let oscillatorsHarmonics = [];

  //Toss a coin for which oscillator setup to use
  if (utils.coinToss()) {
    const osc3 = fmOscillator(oscScale[2], config.lowestOscVolume);
    const osc5 = fmOscillator(oscScale[4], config.lowestOscVolume);
    const osc7 = fmOscillator(oscScale[6], config.lowestOscVolume);
    const osc9 = fmOscillator(oscScale[8], config.lowestOscVolume);
    const osc11 = fmOscillator(oscScale[10], config.lowestOscVolume);
    oscillatorsWithEffects = [oscRoot, oscRootO2, oscRootO3, osc3, osc5, osc7, osc9, osc11];
    oscillatorsWithFrequencyChange = oscillatorsWithEffects;
    oscillatorsWithVolumeChange = [oscRoot, oscRootO2, oscRootO3, osc3];
    oscillatorsHarmonics = [osc5, osc7, osc9, osc11];
  } else {
    const oscFifth = fmOscillator(Tone.Frequency(rootFreq).transpose(27));
    const oscSeventh = fmOscillator(Tone.Frequency(rootFreq).transpose(34), config.lowestOscVolume);
    const oscNinth = fmOscillator(Tone.Frequency(rootFreq).transpose(36), config.lowestOscVolume);
    const oscEleventh = fmOscillator(Tone.Frequency(rootFreq).transpose(38), config.lowestOscVolume);
    oscillatorsWithEffects = [oscRoot, oscRootO2, oscRootO3, oscFifth, oscSeventh, oscNinth, oscEleventh];
    oscillatorsWithFrequencyChange = oscillatorsWithEffects;
    oscillatorsWithVolumeChange = [oscRoot, oscRootO2, oscRootO3, oscFifth];
    oscillatorsHarmonics = [oscSeventh, oscNinth, oscEleventh];
  }

  const chorus = new Tone.Chorus(2, 2.5, 0.5).toMaster();
  const reverb = new Tone.Freeverb().toMaster();
  const phaser = new Tone.Phaser(0.2).toMaster();
  const autoWah = new Tone.AutoWah().toMaster();

  oscillatorsWithEffects.forEach(osc => {
    osc.connect(chorus);
    osc.connect(phaser);
    osc.connect(autoWah);
    osc.connect(reverb);
    osc.frequencyChangeActive = true;
    osc.volumeChangeActive = true;
  });

  const frequencyChangeLoop = new Tone.Loop(() => {
    const frequencyChangeOscillator = utils.randomFromArray(oscillatorsWithFrequencyChange);

    //frequency change
    if (frequencyChangeOscillator.frequencyChangeActive) {
      const transposeAmount = 0.125;
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
  }, config.changeFrequencyInterval);
  frequencyChangeLoop.start(config.changeFrequencyInterval);

  const volumeChangeLoop = new Tone.Loop(() => {
    oscillatorsWithVolumeChange.forEach(osc => {
      osc.volume.exponentialRampToValueAtTime(0, "+1:0:0");
    });
    const volumeChangeOscillator = utils.randomFromArray(oscillatorsWithVolumeChange);
    volumeChangeOscillator.volume.exponentialRampToValueAtTime(-6, "+1:0:0");
  }, config.changeVolumeInterval);
  volumeChangeLoop.start(config.changeVolumeInterval);

  //initialize the noise and start
  const noise = new Tone.Noise("pink").start();
  noise.volume.value = 9;
  const noiseAutoFilter = new Tone.AutoFilter({
    frequency: "8m",
    min: 800,
    max: 15000
  }).toMaster();
  noise.connect(noiseAutoFilter);
  noiseAutoFilter.start();

  //Subtly modulate the reverb
  const lfo = new Tone.LFO("7m", 0.7, 0.9);
  lfo.start();
  lfo.connect(reverb.roomSize);

  //Add slow bass notes
  const bassInstrument = new instruments.bass.FastAttackSquare();
  const pattern = new Tone.Pattern(
    function(time, note) {
      bassInstrument.triggerAttackRelease(note, config.bassInterval, time);
    },
    scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 1, 2),
    "randomWalk"
  );
  pattern.interval = config.bassInterval;
  pattern.start();

  //Fade in the other notes in the chord
  const harmonyLoop = new Tone.Loop(() => {
    const oscs = [...oscillatorsHarmonics, null, null, null];
    const harmonyOscillator = utils.randomFromArray(oscs);
    oscillatorsHarmonics.forEach(osc => {
      if (osc !== harmonyOscillator) {
        osc.volume.exponentialRampToValueAtTime(config.lowestOscVolume, "+1:0:0");
      }
    });
    if (harmonyOscillator) {
      harmonyOscillator.volume.exponentialRampToValueAtTime(0, "+2:0:0");
    }
  }, config.harmonyInterval);
  harmonyLoop.start(config.harmonyInterval);

  return {};
};
