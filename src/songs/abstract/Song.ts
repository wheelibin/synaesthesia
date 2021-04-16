import * as Tone from "tone";

export abstract class Song {
  public isPlaying: boolean;

  constructor() {
    this.isPlaying = false;
  }

  public playPause(): void {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  public play(): void {
    Tone.Transport.start();
    this.isPlaying = true;
  }
  public stop(): void {
    Tone.Transport.stop(0);
    this.isPlaying = false;
  }
}
