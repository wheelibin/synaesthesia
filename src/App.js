import React, { Component } from "react";
import * as synth from "./synth/synth";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { seed: this.getCurrentTimeSeed(), playButtonText: "Play", generatedSettings: null, isPlaying: false, userSeed: "" };
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.handleNewSeed = this.handleNewSeed.bind(this);
    this.playButtonClick = this.playButtonClick.bind(this);
  }
  handleSeedChange(event) {
    this.setState({ userSeed: event.target.value });
  }
  generate() {
    this.setState({ seed: this.state.userSeed });
  }
  handleNewSeed() {
    this.setState({ seed: this.getCurrentTimeSeed() });
    this.play();
  }
  getCurrentTimeSeed() {
    //return "1521578619406";
    return new Date().getTime().toString();
  }
  play() {
    const generatedSettings = synth.play();
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
    Math.seedrandom(this.state.seed);

    const settingsRows = [];
    if (this.state.generatedSettings) {
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
      <div>
        <hr />
        <div className="row">
          <div className="col-sm-12 text-center">
            <form className="form">
              <button type="button" disabled={!this.state.isPlaying} className="btn btn-dark btn-block" onClick={this.handleNewSeed}>
                Randomize!
              </button>

              <h5>or</h5>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control text-center"
                  id="seed"
                  onChange={this.handleSeedChange}
                  placeholder="A word or phrase to generate music from"
                  value={this.state.seed}
                  disabled={!this.state.isPlaying}
                />
              </div>
              <button type="button" disabled={!this.state.isPlaying} className="btn btn-dark btn-block" onClick={this.generate}>
                Generate from phrase
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="main-panel rounded border col-sm-4 offset-4">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h4>Synesthesia</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.playButtonClick} className="main-panel__play-button btn btn-dark btn-block">
                {this.state.playButtonText}
              </button>
            </div>
          </div>

          {generationOptions}

          <div className="main-panel__settings row">
            <div className="col-md-12">
              <p>Generated settings:</p>
              <table className="table">
                <tbody>{settingsRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
