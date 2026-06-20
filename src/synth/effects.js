import { Freeverb, Volume } from "tone";

let _reverb = null;

function getSharedReverb() {
  if (!_reverb) {
    _reverb = new Freeverb().toDestination();
  }
  return _reverb;
}

export function clearEffects() {
  _reverb = null;
}

export function sendToReverb(source, db = 0) {
  const vol = new Volume(db);
  vol.connect(getSharedReverb());
  source.connect(vol);
}
