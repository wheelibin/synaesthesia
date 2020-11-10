import * as Tone from "tone";
import { SongKey } from "../../synth/types/SongKey";

export interface ISongCallback {
  (e?: { note?: Tone.Unit.Frequency; duration?: Tone.Unit.Time; notes?: Tone.Unit.Frequency[] }): void;
}

export interface ICreateParams {
  seed: string;
  onBassNotePlayed: ISongCallback;
  onMotifNotePlayed: ISongCallback;
  onChordPlayed: ISongCallback;
  onKickDrumHit: ISongCallback;
  onSnareDrumHit: ISongCallback;
  onClosedHatHit: ISongCallback;
  onOpenHatHit: ISongCallback;
}

export interface ISongParams {
  key: SongKey;
}
