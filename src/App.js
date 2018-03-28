import React, { Component } from "react";
import debounce from "lodash/debounce";
import * as synth from "./synth/synth";
import "./App.css";
import { version } from "../package.json";
import NowPlayingSection from "./components/NowPlayingSection";
import GenerationOptions from "./components/GenerationOptions";

class App extends Component {
  constructor() {
    super();
    this.state = { seed: "1522133287280", playButtonText: "Play", generatedSettings: null, isPlaying: false };
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.handleRandomise = this.handleRandomise.bind(this);
    this.playButtonClick = this.playButtonClick.bind(this);
    this.play = debounce(this.play, 500);
  }
  handleSeedChange(event) {
    this.setState({ seed: event.target.value.toString() }, function() {
      this.play();
    });
  }
  handleRandomise() {
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
    return (
      <div className="container text-center">
        <div className="main-panel col-md-6 offset-md-3">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="main-title">Synaesthesia</h1>
              <p className="lead">
                A Web Audio experiment by <a href="https://soundcloud.com/wheelibin">wheelibin</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.playButtonClick} className="main-panel__play-button btn btn-block btn-outline-light btn-lg">
                {this.state.playButtonText}
              </button>
              <NowPlayingSection isPlaying={this.state.isPlaying} generatedSettings={this.state.generatedSettings} />
            </div>
          </div>
          <GenerationOptions
            isPlaying={this.state.isPlaying}
            seed={this.state.seed}
            onRandomise={this.handleRandomise}
            onSeedChange={this.handleSeedChange}
          />
        </div>
        <small className="version">v{version}</small>
      </div>
    );
  }
}

export default App;
