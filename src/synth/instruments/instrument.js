export class Instrument {
  constructor(synth, volume) {
    this.synth = synth;
    this.synth.toMaster();
    this.synth.volume.value = volume;
  }
  triggerAttackRelease(note, duration, time) {
    if (note) {
      this.synth.triggerAttackRelease(note, duration, time);
    } else {
      this.synth.triggerAttackRelease(duration, time);
    }
  }
}
