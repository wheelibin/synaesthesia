import * as Tone from "tone";

export interface ITriggerParams {
  note?: Tone.Unit.Frequency;
  notes?: Tone.Unit.Frequency[];
  duration?: Tone.Unit.Time;
  time?: string | number;
  velocity?: number;
}

export interface IInstrument {
  trigger(params: ITriggerParams): void;
  dispose(): void;
}
export interface IInstrumentParams {
  volume?: number;
  attack?: number;
  pan?: number;
}
