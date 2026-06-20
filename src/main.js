import debounce from 'lodash/debounce';
import { version } from '../package.json';
import { start } from 'tone';
import * as synth from './synth/synth.js';
import './style.css';

document.querySelector('.version').textContent = `v${version}`;

const state = {
  song: 0,
  seed: 'a seed',
  isPlaying: false,
  generatedSettings: null,
};

const el = id => document.getElementById(id);

function render() {
  const showDetails = state.isPlaying && state.generatedSettings;

  el('song-details').style.display = showDetails ? '' : 'none';
  el('info-section').style.display = showDetails ? '' : 'none';

  el('btn-song-1').className = `btn btn-lg btn-outline-light${state.song === 1 ? ' active-song-true' : ''}`;
  el('btn-song-2').className = `btn btn-lg btn-outline-light${state.song === 2 ? ' active-song-true' : ''}`;

  if (state.song > 0) {
    el('playback-row').style.display = '';
    el('btn-play-stop').textContent = state.isPlaying ? 'Stop' : 'Play';
  } else {
    el('playback-row').style.display = 'none';
  }

  if (showDetails) {
    el('song-key').textContent = state.generatedSettings.key;
    el('song-chords').textContent = state.generatedSettings.chordProgressionNotes;
    el('seed-input').value = state.seed;
  }
}

async function play(song, seed) {
  synth.reset();
  await start();
  state.song = song;
  state.seed = seed;
  state.generatedSettings = synth.play(song, seed);
  state.isPlaying = true;
  render();
}

const playDebounced = debounce(play, 400);

document.querySelectorAll('[data-song]').forEach(btn => {
  btn.addEventListener('click', async e => {
    const song = parseInt(e.currentTarget.dataset.song, 10);
    await play(song, state.seed);
    window.location.hash = encodeURIComponent(state.seed);
  });
});

el('seed-input').addEventListener('input', e => {
  const seed = e.target.value;
  state.seed = seed;
  window.location.hash = encodeURIComponent(seed);
  if (state.song) {
    playDebounced(state.song, seed);
  }
});

el('btn-play-stop').addEventListener('click', async () => {
  if (state.isPlaying) {
    synth.stop();
    state.isPlaying = false;
    state.generatedSettings = null;
    render();
  } else {
    await play(state.song, state.seed);
  }
});

el('btn-randomise').addEventListener('click', async () => {
  const seed = new Date().getTime().toString();
  await play(state.song, seed);
  window.location.hash = encodeURIComponent(seed);
});

// On load: if there's a seed in the hash, pre-select song 1 and populate the seed.
// The Play button will be visible; audio starts on first user interaction.
// #drone is a special headless mode — attempted without a gesture, may be blocked by browser.
const initialHash = decodeURIComponent(window.location.hash.slice(1));
if (initialHash === 'drone') {
  el('app').style.display = 'none';
  synth.reset();
  start().then(() => synth.play(2, new Date().getTime().toString()));
} else if (initialHash) {
  state.song = 1;
  state.seed = initialHash;
  render();
} else {
  render();
}
