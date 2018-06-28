import Tone from "tone";
import * as utils from "../../utils";
import * as scales from "../scales";
import instruments from "../instruments";

const fmOscillator = (note, volume = 0) => {
  const oscType = utils.randomFromArray(["sine", "square4"]);
  const osc = new Tone.FMOscillator(note, oscType, "square").toMaster().start(0.5);
  osc.volume.value = volume;
  return osc;
};
const transpose = (freq, semitones) => {
  return Tone.Frequency(freq).transpose(semitones);
};
export const play = visCallback => {
  Tone.Master.volume.value = -32;

  const config = {
    lowestOscVolume: -50,
    changeFrequencyInterval: "4m",
    changeVolumeInterval: "3m",
    bassInterval: "4m",
    harmonyInterval: "7m",
    harmonyFadeOutTime: "+2:0:0",
    harmonyOscVolume: -4,
    extraOscillatorInterval: "6m",
    extraOscillatorFadeOutTime: "+2:2:0",
    changeRootInterval: "64m"
  };

  const masterScale = scales.getRandomScaleType();
  const root = scales.getRandomRootNote();
  const rootFreq = Tone.Frequency(root + "0");
  const oscScale = scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 2, 3);
  const harmonyNotes = utils.shuffleArray(scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 3, 3));
  const harmonyOscillator = fmOscillator(rootFreq, config.lowestOscVolume);

  let oscillatorsWithEffects = [];
  let oscillatorsWithFrequencyChange = [];
  let oscillatorsWithVolumeChange = [];
  let extraOscillators = [];

  let changeRootAndTransposeAllToMatch = null;
  const changeRootRampTime = "+4:0:0";

  //Create the bass pattern
  const bassInstrument = new instruments.bass.FastAttackSquare();
  const bassPattern = new Tone.Pattern(
    function(time, note) {
      bassInstrument.triggerAttackRelease(note, config.bassInterval, time);
      Tone.Draw.schedule(function() {
        if (visCallback) {
          visCallback();
        }
      }, time);
    },
    scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 1, 2),
    "randomWalk"
  );
  bassPattern.interval = config.bassInterval;
  bassPattern.start();

  const oscRoot = fmOscillator(rootFreq);
  const oscRootO2 = fmOscillator(transpose(rootFreq, 12));
  const oscRootO3 = fmOscillator(transpose(rootFreq, 24));
  const osc3 = fmOscillator(oscScale[2], config.lowestOscVolume);
  const osc5 = fmOscillator(oscScale[4], config.lowestOscVolume);
  const osc7 = fmOscillator(oscScale[6], config.lowestOscVolume);
  const osc9 = fmOscillator(oscScale[8], config.lowestOscVolume);
  const osc11 = fmOscillator(oscScale[10], config.lowestOscVolume);
  const osc13 = fmOscillator(oscScale[12], config.lowestOscVolume);

  oscillatorsWithEffects = [harmonyOscillator, oscRoot, oscRootO2, oscRootO3, osc3, osc5, osc7, osc9, osc11, osc13];
  oscillatorsWithFrequencyChange = oscillatorsWithEffects;
  oscillatorsWithVolumeChange = [oscRoot, oscRootO2, oscRootO3, osc3];
  extraOscillators = [osc5, osc7, osc9, osc11, osc13];

  changeRootAndTransposeAllToMatch = newRoot => {
    newRoot = Tone.Frequency(newRoot);
    const newScale = scales.actualNotesFromScale(newRoot.toNote(), masterScale.intervals, 2, 3);
    //Change the oscillators to the new notes
    oscRoot.frequency.linearRampToValueAtTime(newRoot, changeRootRampTime);
    oscRootO2.frequency.linearRampToValueAtTime(transpose(newRoot, 24), changeRootRampTime);
    osc3.frequency.linearRampToValueAtTime(newScale[2], changeRootRampTime);
    osc5.frequency.linearRampToValueAtTime(newScale[4], changeRootRampTime);
    osc7.frequency.linearRampToValueAtTime(newScale[6], changeRootRampTime);
    osc9.frequency.linearRampToValueAtTime(newScale[8], changeRootRampTime);
    osc11.frequency.linearRampToValueAtTime(newScale[10], changeRootRampTime);
    bassPattern.values = scales.actualNotesFromScale(newRoot.toNote(), masterScale.intervals, 1, 2);
  };

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

  //Subtly modulate the noise volume
  const noiseVolumeLfo = new Tone.LFO("9m", 8, 10);
  noiseVolumeLfo.start();
  noiseVolumeLfo.connect(noise.volume);

  //Subtly modulate the reverb
  const reverbRoomSizeLfo = new Tone.LFO("7m", 0.7, 0.9);
  reverbRoomSizeLfo.start();
  reverbRoomSizeLfo.connect(reverb.roomSize);

  //Subtly modulate the reverb
  const reverbDampeningLfo = new Tone.LFO("6m", 1000, 4000);
  reverbDampeningLfo.start();
  reverbDampeningLfo.connect(reverb.dampening);

  //Fade in and out one other random oscillator
  const extraOscillatorLoop = new Tone.Loop(() => {
    const oscs = [...extraOscillators];
    const extraOscillator = utils.randomFromArray(oscs);
    extraOscillators.forEach(osc => {
      if (osc !== extraOscillator) {
        osc.volume.exponentialRampToValueAtTime(config.lowestOscVolume, "+1:0:0");
      }
    });
    Tone.Transport.scheduleOnce(function(time) {
      extraOscillator.volume.rampTo(0, "1m", time);
    }, config.extraOscillatorFadeOutTime);
  }, config.extraOscillatorInterval);
  // extraOscillatorLoop.probability = 0.7;
  extraOscillatorLoop.start(config.extraOscillatorInterval);

  const harmonyOscillatorLoop = new Tone.Loop(time => {
    const note = harmonyNotes.shift();
    harmonyOscillator.frequency.value = note;
    harmonyOscillator.volume.rampTo(config.harmonyOscVolume, "1m", time);

    Tone.Transport.scheduleOnce(function(time) {
      harmonyOscillator.volume.rampTo(config.lowestOscVolume, "1m", time);
    }, config.harmonyFadeOutTime);
    harmonyNotes.push(note);
  }, config.harmonyInterval);
  // harmonyOscillatorLoop.probability = 0.8;
  harmonyOscillatorLoop.start(config.harmonyInterval);

  //Transpose th whole lot by changing the root
  const changeRootPattern = new Tone.Pattern(
    function(time, note) {
      changeRootAndTransposeAllToMatch(note);
    },
    scales.actualNotesFromScale(rootFreq.toNote(), masterScale.intervals, 0, 0),
    "randomWalk"
  );
  changeRootPattern.interval = config.changeRootInterval;
  changeRootPattern.start(config.changeRootInterval);

  return {
    bpm: 70,
    swing: 0,
    key: `${root} (${masterScale.type})`,
    chordProgressionNotes: "n/a"
  };
};
