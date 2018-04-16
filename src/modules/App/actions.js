import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";
import * as flickrApi from "../../api/flickrApi";

export const Play = () => {
  return (dispatch, getState) => {
    const generatedSettings = synth.play(getState().app.song, getState().app.seed, null, visData => {
      dispatch(ChangeImage());
      //dispatch(UpdateEnvelopeValue(kv));
    });
    dispatch({
      type: actions.SYNTH_PLAY,
      payload: generatedSettings
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

export const SetInitialSeed = newSeed => {
  return dispatch => {
    dispatch({ type: actions.UPDATE_SEED, payload: newSeed });
    dispatch({ type: actions.SYNTH_PLAY });
  };
};

export const SetSeed = newSeed => {
  return (dispatch, getState) => {
    dispatch({ type: actions.UPDATE_SEED, payload: newSeed });
    synth.playDebounced(getState().app.song, newSeed, generatedSettings => {
      dispatch({ type: actions.UPDATE_GENERATED_SETTINGS, payload: generatedSettings });
    });
  };
};

export const RandomiseSeed = () => {
  return () => {
    const randomSeed = new Date().getTime().toString();
    return SetSeed(randomSeed);
  };
};

export const SetSong = song => {
  return dispatch => {
    dispatch({ type: actions.SET_SONG, payload: song });
    dispatch(Play());
  };
};

const runUntilCheckPasses = (fn, check, isDone, dispatch) => {
  if (isDone) return;
  const promise = fn();
  return promise.then(data => runUntilCheckPasses(fn, check, check(dispatch, data), dispatch));
};

var page = 0;
const getNextImage = () => {
  const apiResponse = flickrApi.getImage(page++, "bokeh", "music instrument");
  return apiResponse;
};

const check = (dispatch, response) => {
  const hasOkImage =
    response.data.photos !== undefined &&
    response.data.photos.photo.length > 0 &&
    response.data.photos.photo.find(p => p.url_c !== undefined) !== undefined;
  if (hasOkImage) {
    const mediumImage = response.data.photos.photo.find(p => p.url_c !== undefined);
    const newImage = mediumImage.url_c;
    var img = new Image();

    img.onload = function() {
      dispatch({ type: actions.CHANGE_IMAGE, payload: newImage });
    };
    img.src = newImage;
  }

  return hasOkImage;
};

export const ChangeImage = () => {
  return dispatch => {
    runUntilCheckPasses(getNextImage, check, false, dispatch);
  };
};
