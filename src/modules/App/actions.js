import * as actions from "./actionTypes";

export const Play = () => {
  return dispatch => {
    dispatch({
      type: actions.SYNTH_PLAY
    });
  };
};

export const Stop = () => {
  return dispatch => {
    dispatch({
      type: actions.SYNTH_STOP
    });
  };
};

export const PlayButtonClick = () => {
  return (dispatch, getState) => {
    getState().app.isPlaying ? dispatch({ type: actions.SYNTH_STOP }) : dispatch({ type: actions.SYNTH_PLAY });
  };
};

export const SetSeed = newSeed => {
  return dispatch => {
    dispatch({ type: actions.SET_SEED, payload: newSeed });
  };
};

export const RandomiseSeed = () => {
  const randomSeed = new Date().getTime().toString();
  return dispatch => {
    dispatch({ type: actions.SET_SEED, payload: randomSeed });
  };
};
