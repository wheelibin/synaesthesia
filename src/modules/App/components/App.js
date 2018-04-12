import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { version } from "../../../../package.json";
import NowPlayingSection from "./NowPlayingSection";
import GenerationOptions from "./GenerationOptions";
import Songs from "./Songs";
import Info from "./Info";

class App extends Component {
  componentWillMount() {
    if (this.props.match.params.seed) {
      this.props.actions.SetInitialSeed(this.props.match.params.seed);
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

        <div className="row">
          <div className="col-md-8 offset-md-2">
            <NowPlayingSection isPlaying={this.props.isPlaying} generatedSettings={this.props.generatedSettings} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 offset-md-2">
            <GenerationOptions
              isPlaying={this.props.isPlaying}
              seed={this.props.seed}
              onRandomise={this.randomiseSeed}
              onSeedChange={this.handleSeedChange}
            />
            {/* <button onClick={this.props.actions.PlayButtonClick} className="main-panel__play-button btn btn-block btn-outline-light btn-lg">
              {this.props.playButtonText}
            </button> */}
          </div>
        </div>

        <div className="main-panel col-md-8 offset-md-2">
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
  history: PropTypes.object.isRequired
};
export default App;
