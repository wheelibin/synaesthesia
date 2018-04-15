import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";

const initialState = {
  song: 1,
  seed: "a seed",
  playButtonText: "Play",
  generatedSettings: null,
  isPlaying: false,
  activeSongClassName: "funky-down-tempo--active"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SYNTH_PLAY: {
      state = { ...state, generatedSettings: action.payload, playButtonText: "Stop", isPlaying: true };
      break;
    }

    case actions.SYNTH_STOP: {
      synth.stop();
      state = { ...state, playButtonText: "Play", isPlaying: false };
      break;
    }

    case actions.UPDATE_SEED: {
      const newSeed = action.payload;
      state = { ...state, seed: newSeed };
      break;
    }

    case actions.UPDATE_GENERATED_SETTINGS: {
      const generatedSettings = action.payload;
      state = { ...state, generatedSettings: generatedSettings };
      break;
    }

    case actions.SET_SONG: {
      const newSong = action.payload;
      state = {
        ...state,
        song: newSong
      };
      break;
    }

    default:
      break;
  }

  return state;
};
