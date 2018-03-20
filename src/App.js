import React, { Component } from "react";
import * as synth from "./synth/synth";

class App extends Component {
  constructor() {
    super();
    this.state = { seed: this.getCurrentTimeSeed() };
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.handleNewSeed = this.handleNewSeed.bind(this);
  }
  handleSeedChange(event) {
    this.setState({ seed: event.target.value });
  }
  handleNewSeed() {
    this.setState({ seed: this.getCurrentTimeSeed() });
  }
  getCurrentTimeSeed() {
    //return "1521578619406";
    return new Date().getTime().toString();
  }
  render() {
    Math.seedrandom(this.state.seed);
    const generatedSettings = synth.play();

    const settingsRows = [
      <tr key={"seed"}>
        <th>Seed</th>
        <td>{this.state.seed}</td>
      </tr>
    ];
    Object.keys(generatedSettings).forEach(function(key) {
      const row = (
        <tr key={key}>
          <th>{key}</th>
          <td>{JSON.stringify(generatedSettings[key])}</td>
        </tr>
      );

      settingsRows.push(row);
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="seed">Seed</label>
              <input
                type="text"
                className="form-control"
                id="seed"
                aria-describedby="emailHelp"
                placeholder="Feel the music"
                onBlur={this.handleSeedChange}
              />
            </div>

            <div>
              <button className="btn btn-dark" type="button" onClick={this.handleNewSeed}>
                Randomize!
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p>Generated settings:</p>
            <table className="table">
              <tbody>{settingsRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
