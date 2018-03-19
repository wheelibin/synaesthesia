import React, { Component } from "react";
import "./App.css";
import * as synth from "./synth/synth";

class App extends Component {
  render() {
    //Math.seedrandom("Music is the food of the soul!");
    //Math.seedrandom("Without music, life would be a mistake");
    // Math.seedrandom(
    //   "Music expresses that which cannot be put into words and that which cannot remain silent"
    // );
    // Math.seedrandom(
    //   "And those who were seen dancing were thought to be insane by those who could not hear the music"
    // );
    //Math.seedrandom("None but ourselves can free our minds");
    //Math.seedrandom("!");
    //Math.seedrandom("Kate");
    synth.play();

    return <div className="App" />;
  }
}

export default App;
