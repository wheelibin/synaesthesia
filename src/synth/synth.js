import { setContext, Context, getTransport, getContext } from "tone";
import { clearEffects } from "./effects.js";
import songs from "./songs";

export const reset = () => {
  setContext(new Context(), true);
  clearEffects();
};

export const play = (song, seed, callback = null, visCallback = null) => {
  Math.seedrandom(seed);

  const generatedSettings = songs[song].play(visCallback);

  getTransport().bpm.value = generatedSettings.bpm;
  getTransport().swing = generatedSettings.swing;

  getTransport().start(1);

  if (callback) {
    callback(generatedSettings);
  }

  return generatedSettings;
};

export const stop = () => {
  getContext().dispose();
};
