import * as color from "color";

export interface IColours {
  base: color;
  kick: color;
  snare: color;
  closedHat: color;
  openHat: color;
  bass: color;
  chord: color;
  motif: color;
}
export interface IDrumHitShape {
  diameter: number;
  angle: number;
}
export interface IDrumHitShapes {
  kick: IDrumHitShape;
  snare: IDrumHitShape;
  closedHat: IDrumHitShape;
  openHat: IDrumHitShape;
}

export interface INoteDisplay {
  text: string;
  alpha: number;
  alphaDecrement: number;
}
export interface INoteDisplays {
  bass: INoteDisplay;
  chord: INoteDisplay;
  motif: INoteDisplay;
}
