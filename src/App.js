import React, { Component } from "react";
import "./App.css";
import * as synth from "./synth/synth";

class App extends Component {
  render() {
    //Math.seedrandom("synth");
    synth.play();

    return <div className="App" />;
  }
}

export default App;
