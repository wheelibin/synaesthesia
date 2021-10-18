import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { version } from "../../../../package.json";
import Songs from "./Songs";
import Info from "./Info";
import Song from "./Song";

class App extends Component {
  constructor(props) {
    super();
    let song = props.song;
    if (props.match.params.seed) {
      song = 1;
      props.actions.SetInitialSeed(props.match.params.seed);
    }

    if (song) {
      props.actions.SetSong(song);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.actions.SetSeed(this.props.match.params.seed || "");
    }
  }
  handleSeedChange = event => {
    const newSeed = event.target.value.toString();
    this.props.history.push("/" + newSeed);
  };
  handleSongSelection = event => {
    const song = parseInt(event.target.getAttribute("data-song"), 10);
    this.props.actions.SetSong(song);
  };
  randomiseSeed = () => {
    const randomSeed = new Date().getTime().toString();
    this.props.history.push("/" + randomSeed);
  };
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="main-title">Synaesthesia</h1>
            <p className="lead">
              Web Audio experiments by <a href="https://soundcloud.com/wheelibin">wheelibin</a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Songs onSongSelection={this.handleSongSelection} song={this.props.song} />
          </div>
        </div>

        {this.props.isPlaying && (
          <Song
            isPlaying={this.props.isPlaying}
            generatedSettings={this.props.generatedSettings}
            seed={this.props.seed}
            onRandomise={this.randomiseSeed}
            onSeedChange={this.handleSeedChange}
          />
        )}

        <div className="col-md-6 offset-md-3" style={{ marginTop: 0 }}>
          <Info isPlaying={this.props.isPlaying} />
        </div>
        <small className="version">v{version}</small>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  generatedSettings: PropTypes.object,
  seed: PropTypes.string.isRequired,
  playButtonText: PropTypes.string.isRequired,
  match: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  song: PropTypes.number.isRequired
};
export default App;
