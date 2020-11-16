import * as Tone from "tone";
import { IInstrument, ITriggerParams } from "./IInstrument";

export class AcidSynth implements IInstrument {
  private synth: Tone.MonoSynth;
  private autoFilter: Tone.AutoFilter;
  private reverb: Tone.Reverb;
  private autoPan: Tone.AutoPanner;

  constructor(volume = -27) {
    this.autoFilter = new Tone.AutoFilter({ frequency: "2m" }).start().toDestination();
    this.reverb = new Tone.Reverb({ decay: 1, wet: 0.5 }).toDestination();
    this.autoPan = new Tone.AutoPanner({ frequency: "2m", wet: 0.3 }).start().toDestination();
    this.synth = new Tone.MonoSynth({ volume, portamento: 0, envelope: { attack: 0.01 }, filterEnvelope: { attack: 0.03 } })
      .connect(this.autoFilter)
      .connect(this.autoPan)
      .connect(this.reverb);
  }
  dispose(): void {
    this.synth.envelope.cancel();
    if (!this.synth.disposed) {
      this.reverb.disconnect();
      this.reverb.dispose();
      this.autoFilter.disconnect();
      this.autoFilter.dispose();
      this.autoPan.disconnect();
      this.autoPan.dispose();
      this.synth.disconnect();
      this.synth.dispose();
    }
  }

  trigger({ note, duration, time }: ITriggerParams): void {
    this.synth.envelope.cancel();
    this.synth.triggerAttackRelease(note, duration, time);
  }
}
