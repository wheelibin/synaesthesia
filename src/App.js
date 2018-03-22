import React, { Component } from "react";
import debounce from "lodash/debounce";
import * as synth from "./synth/synth";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { seed: this.getCurrentTimeSeed(), playButtonText: "Play", generatedSettings: null, isPlaying: false };
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
    this.setState({ generatedSettings: generatedSettings, playButtonText: "Stop" });
  }
  stop() {
    synth.stop();
    this.setState({ playButtonText: "Play" });
  }
  playButtonClick() {
    if (this.state.isPlaying) {
      this.stop();
    } else {
      this.play();
    }

    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    const settingsRows = [];
    let nowPlaying;
    if (this.state.generatedSettings) {
      if (this.state.isPlaying) {
        nowPlaying = `Currently playing a little ditty in the key of ${this.state.generatedSettings.key}`;
      }

      settingsRows.push(
        <tr key={"seed"}>
          <th>Seed</th>
          <td>{this.state.seed}</td>
        </tr>
      );
      Object.keys(this.state.generatedSettings).forEach(key => {
        const row = (
          <tr key={key}>
            <th>{key}</th>
            <td>{JSON.stringify(this.state.generatedSettings[key])}</td>
          </tr>
        );

        settingsRows.push(row);
      });
    }

    const generationOptions = (
      <div className="generation-options">
        <div className="row">
          <div className="col-sm-12 text-center">
            {/* <p className="text-justify">
              The music is randomly generated within certain musical constraints, the seed for the currently playing song is shown below.
            </p>
            <p className="text-justify">
              Try experimenting by entering your own seed, it can be any text string - why not see what your name sounds like? :-)
            </p> */}
            <p className="text-justify">
              The music is randomly generated within certain musical constraints, the seed for the currently playing song is shown below. This can be
              shared and entered again to recreate the exact combination of random parameters used to generate this song. Try experimenting by
              entering your own seed, it can be any text string - why not see what your name sounds like? :-)
            </p>

            <form className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg text-center"
                  id="seed"
                  onChange={this.handleSeedChange}
                  placeholder="A word or phrase to generate music from"
                  value={this.state.seed}
                  disabled={!this.state.isPlaying}
                />
              </div>

              <button type="button" disabled={!this.state.isPlaying} className="btn btn-outline-light btn-lg btn-block" onClick={this.handleNewSeed}>
                Randomise!
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container text-center">
        <h1 className="display-1">Synesthesia</h1>
        <p className="lead">A Web Audio experiment</p>

        <div className="main-panel col-sm-6 offset-3">
          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.playButtonClick} className="main-panel__play-button btn btn-block btn-outline-light btn-lg">
                {this.state.playButtonText}
              </button>
              <span className="now-playing">{nowPlaying}</span>
            </div>
          </div>

          {this.state.isPlaying ? generationOptions : null}

          {/* <div className="main-panel__settings row">
            <div className="col-md-12">
              <p>Generated settings:</p>
              <table className="table">
                <tbody>{settingsRows}</tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
