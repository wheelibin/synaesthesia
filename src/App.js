import React, { Component } from "react";
import "./App.css";
import * as synth from "./synth/synth";

class App extends Component {
  render() {
    Math.seedrandom("Music is the food of the soul");

    synth.play();

    return <div className="App" />;
  }
}

export default App;
