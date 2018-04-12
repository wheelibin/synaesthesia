import * as appConstants from "../../constants";
import * as moduleConstants from "./constants";

const prefix = `${appConstants.APP_NAME}/${moduleConstants.MODULE_NAME}/`;

export const PLAY_BUTTON_CLICK = prefix + "PLAY_BUTTON_CLICK";
export const SYNTH_PLAY = prefix + "SYNTH_PLAY";
export const SYNTH_STOP = prefix + "SYNTH_STOP";
export const UPDATE_SEED = prefix + "UPDATE_SEED";
export const UPDATE_GENERATED_SETTINGS = prefix + "UPDATE_GENERATED_SETTINGS";
export const SET_SONG = prefix + "SET_SONG";
