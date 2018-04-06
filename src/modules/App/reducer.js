import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";

const initialState = { seed: "yeah", playButtonText: "Play", generatedSettings: null, isPlaying: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SYNTH_PLAY: {
      const generatedSettings = synth.play(state.seed);
      state = { ...state, generatedSettings: generatedSettings, playButtonText: "Stop", isPlaying: true };
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

    default:
      break;
  }

  return state;
};
