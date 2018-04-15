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
var image = 0;
export const ChangeImage = () => {
  return dispatch => {
    flickrApi.getImage(image++).then(response => {
      //console.log(response.data.photos.photo[0]);
      const { farm, server, id, secret } = response.data.photos.photo[0];
      const newImage = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
      console.log(newImage);
      dispatch({ type: actions.CHANGE_IMAGE, payload: newImage });
    });

    // const newImage = "https://picsum.photos/1148/492/?image=" + image++;
  };
};
