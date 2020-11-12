import { ICreateParams, ISongParams } from "./songTypes";

export interface ISong {
  create(params: ICreateParams): Promise<ISongParams>;
  dispose(): void;
  playPause(): void;
  play(): void;
  stop(): void;
}
