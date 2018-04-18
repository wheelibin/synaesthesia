import * as actions from "./actionTypes";
import * as synth from "../../synth/synth";

const initialState = {
  song: 1,
  seed: "a seed", //1523983162306
  playButtonText: "Play",
  generatedSettings: null,
  isPlaying: false,
  currentImage: "https://farm5.staticflickr.com/4009/4693323665_28d5825b16_b.jpg",
  images: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SYNTH_PLAY: {
      state = {
        ...state,
        generatedSettings: action.payload,
        playButtonText: "Stop",
        isPlaying: true
      };
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

    case actions.CHANGE_IMAGE: {
      state = { ...state, currentImage: action.payload };
      break;
    }

    case actions.SET_IMAGE_PAGECOUNT: {
      state = { ...state, imagePageCount: action.payload };
      break;
    }

    case actions.IMAGES_FOUND: {
      state = { ...state, images: [...state.images, ...action.payload] };
      break;
    }

    case actions.SELECT_NEXT_IMAGE: {
      const images = [...state.images];
      const nextImage = images.shift();

      state = { ...state, images: images, nextImage: nextImage };

      break;
    }

    case actions.CLEAR_IMAGES: {
      state = { ...state, images: [] };
      break;
    }

    default:
      break;
  }

  return state;
};
