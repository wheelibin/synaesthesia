import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";

const initialState = { seed: "1522133287280", playButtonText: "Play", generatedSettings: null, isPlaying: false };

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

    case actions.SET_SEED: {
      state = { ...state, seed: action.payload };
      synth.playDebounced(state.seed);
      break;
    }

    default:
      break;
  }

  return state;
};
