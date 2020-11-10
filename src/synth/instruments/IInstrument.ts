import * as Tone from "tone";

export interface ITriggerParams {
  note?: Tone.Unit.Frequency;
  notes?: Tone.Unit.Frequency[];
  duration?: Tone.Unit.Time;
  time?: string | number;
}

export interface IInstrument {
  trigger(params: ITriggerParams): void;
  dispose(): void;
}
