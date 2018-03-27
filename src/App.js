import React, { Component } from "react";
import debounce from "lodash/debounce";
import * as synth from "./synth/synth";
import "./App.css";
import { version } from "../package.json";

class App extends Component {
  constructor() {
    super();
    this.state = { seed: "1522133287280", playButtonText: "Play", generatedSettings: null, isPlaying: false };
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.handleNewSeed = this.handleNewSeed.bind(this);
    this.playButtonClick = this.playButtonClick.bind(this);
    this.play = debounce(this.play, 500);
  }
  handleSeedChange(event) {
    this.setState({ seed: event.target.value.toString() }, function() {
      this.play();
    });
  }
  handleNewSeed() {
    this.setState({ seed: this.getCurrentTimeSeed() }, function() {
      this.play();
    });
  }
  getCurrentTimeSeed() {
    return new Date().getTime().toString();
  }
  play() {
    const generatedSettings = synth.play(this.state.seed);
    this.setState({ generatedSettings: generatedSettings, playButtonText: "Stop", isPlaying: true });
  }
  stop() {
    synth.stop();
    this.setState({ playButtonText: "Play", isPlaying: false });
  }
  playButtonClick() {
    if (this.state.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  render() {
    let nowPlayingSection;
    if (this.state.generatedSettings) {
      if (this.state.isPlaying) {
        nowPlayingSection = (
          <section className="now-playing-section">
            <div className="row">
              <div className="col-sm-12">
                <h5>Key</h5>
                <p className="now-playing">{this.state.generatedSettings.key}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <h5>Chord Progression</h5>
                <p className="now-playing-chords">{this.state.generatedSettings.chordProgressionNotes}</p>
              </div>
            </div>
          </section>
        );
      }
    }

    const generationOptions = (
      <div className="generation-options border-top">
        <div className="row">
          <div className="col-sm-12 text-center">
            <form className="form">
              <div className="form-group">
                <label htmlFor="seed">Seed (try entering your own)</label>
                <input
                  type="text"
                  className="form-control form-control-lg text-center seed-input"
                  id="seed"
                  onChange={this.handleSeedChange}
                  placeholder="A word or phrase to generate music from"
                  value={this.state.seed}
                  disabled={!this.state.isPlaying}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seed">Or generate a random seed</label>
                <button
                  type="button"
                  disabled={!this.state.isPlaying}
                  className="btn btn-outline-light btn-lg btn-block"
                  onClick={this.handleNewSeed}
                >
                  Randomise!
                </button>
              </div>
            </form>
            <p className="text-justify">
              The music is randomly generated within certain musical constraints, the seed for the currently playing song is shown above. This can be
              shared and entered again to recreate the exact combination of random parameters used to generate this song. Try experimenting by
              entering your own seed, it can be any text string - why not see what your name sounds like? :-)
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container text-center">
        <div className="main-panel col-md-6 offset-md-3">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="main-title">Synaesthesia</h1>
              <p className="lead">A Web Audio experiment</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.playButtonClick} className="main-panel__play-button btn btn-block btn-outline-light btn-lg">
                {this.state.playButtonText}
              </button>
              {nowPlayingSection}
            </div>
          </div>

          {this.state.isPlaying ? generationOptions : null}
        </div>
        <small className="version">v{version}</small>
      </div>
    );
  }
}

export default App;
