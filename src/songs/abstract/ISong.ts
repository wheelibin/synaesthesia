import { ICreateParams, ISongParams } from "./songTypes";

export interface ISong {
  create(params: ICreateParams): ISongParams;
  dispose(): void;
  playPause(): void;
  play(): void;
  stop(): void;
}
