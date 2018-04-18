/* globals Image */

import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";
import * as flickrApi from "../../api/flickrApi";
import * as utils from "../../utils";

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
    synth.playDebounced(
      getState().app.song,
      newSeed,
      generatedSettings => {
        dispatch({
          type: actions.UPDATE_GENERATED_SETTINGS,
          payload: generatedSettings
        });
      },
      visData => {
        dispatch(ChangeImage());
        //dispatch(UpdateEnvelopeValue(kv));
      }
    );
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

const getNextImage = (page, group) => {
  const apiResponse = flickrApi.getImages(page, group);
  return apiResponse;
};
const checkForAcceptableImage = (dispatch, getState, response) => {
  const data = response.data;
  dispatch({ type: actions.SET_IMAGE_PAGECOUNT, payload: data.photos.pages });

  const acceptableImages = data.photos.photo.filter(photo => photo.url_c !== undefined);
  dispatch({ type: actions.IMAGES_FOUND, payload: acceptableImages });
  dispatch({ type: actions.SELECT_NEXT_IMAGE });

  const newImage = getState().app.nextImage;
  var img = new Image();
  img.onload = function() {
    dispatch({ type: actions.CHANGE_IMAGE, payload: newImage });
  };
  img.src = newImage;

  return true;
};

//If < 10 get more

// const foundAcceptableImage =
//   data.photos !== undefined && data.photos.photo.length > 0 && data.photos.photo.find(p => p.url_c !== undefined) !== undefined;

// if (foundAcceptableImage) {
//   const mediumImage = data.photos.photo.find(p => p.url_c !== undefined);
//   const newImage = mediumImage.url_c;
//   var img = new Image();
//   img.onload = function() {
//     dispatch({ type: actions.CHANGE_IMAGE, payload: newImage });
//   };
//   img.src = newImage;
// }

// return foundAcceptableImage;
// };

let page = 1;
export const ChangeImage = () => {
  return (dispatch, getState) => {
    const group = getState().app.song === 1 ? "2702819%40N24" : "430026@N21";
    const totalPages = getState().app.imagePageCount;

    page++;
    if (page > totalPages) {
      page = 1;
    }

    const getNextGroupImage = () => {
      return getNextImage(page, group);
    };

    utils.runFunctionUntilCheckPasses(getNextGroupImage, checkForAcceptableImage, false, dispatch, getState);
  };
};
